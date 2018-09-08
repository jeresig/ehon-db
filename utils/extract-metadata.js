const fs = require("fs");
const zlib = require("zlib");
const JSONStream = require("JSONStream");
const es = require("event-stream");

let lastUrl = "";
let curData = null;
const results = [];

const fieldMapping = {
    f1: "id",
    f4: "title",
    f7: "creator",
    f9: "genres",
    //f11: "date",
    f33: "source",
    //f34: "sourceURL",
};

const sourceMap = {
    "Ebi(個人)": "ebi",
    "The British Museum": "bm",
    立命館ARC: "arc",
    "立命館ARC(藤井永観文庫)": "arc",
};

fs.createReadStream("./all-in-one.json.gz")
    .pipe(zlib.createGunzip())
    .pipe(JSONStream.parse([true, true, "metadata", true]))
    .pipe(
        es.map((data, callback) => {
            if (data.fieldName === "f1") {
                console.log(`Processing ${data.value}...`);
                curData = {
                    lang: "ja",
                    url: `http://www.dh-jac.net/db1/books-e/results.php?f64=${
                        data.value
                    }`,
                    images: [],
                };
                results.push(curData);
            }

            if (fieldMapping[data.fieldName]) {
                let {value} = data;

                if (data.fieldName === "f7") {
                    value = value
                        .split(/、/)
                        .map((str) => str.trim())
                        .filter((val) => !!val);
                }

                if (data.fieldName === "f9") {
                    value = value
                        .split(/、|,|・|　/)
                        .map((str) => str.trim())
                        .filter((val) => !!val);
                }

                if (data.fieldName === "f33") {
                    value = sourceMap[value] || value;
                }

                curData[fieldMapping[data.fieldName]] = value;
            }

            if (data.syoseki2) {
                for (const entry of data.syoseki2) {
                    const imgFields = Object.values(entry)[0];
                    for (const imgField of imgFields) {
                        if (imgField.fieldName === "f8") {
                            curData.images.push(imgField.value);
                        }
                    }
                }
            }

            callback();
        }),
    )
    .on("end", () => {
        console.log("Filtering out missing images...");

        const filteredResults = results.filter((data) => {
            if (!data.source) {
                return false;
            }

            // Check if the image has been downloaded
            data.images = data.images.filter((imgName) =>
                fs.existsSync(`./sorted-images/${data.source}/${imgName}`),
            );

            return data.images.length > 0;
        });

        const genres = {};
        const sources = {};

        for (const result of filteredResults) {
            if (result.source) {
                if (!sources[result.source]) {
                    sources[result.source] = [];
                }
            }

            if (result.genres) {
                for (const genre of result.genres) {
                    genres[genre] = true;
                }
            }

            sources[result.source].push(result);
        }

        for (const sourceName of Object.keys(sources)) {
            console.log(`Saving ${sourceName}...`);

            fs.writeFileSync(
                `./data-${sourceName}.json`,
                JSON.stringify(sources[sourceName]),
            );
        }

        console.log("Genres", JSON.stringify(Object.keys(genres).sort()));
        console.log("Sources", JSON.stringify(Object.keys(sources).sort()));
    });
