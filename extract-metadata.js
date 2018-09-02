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
    f11: "date",
    f33: "sourceName",
    f34: "sourceURL",
};

fs.createReadStream("./all-in-one.json.gz")
    .pipe(zlib.createGunzip())
    .pipe(JSONStream.parse([true, true, "metadata", true]))
    .pipe(
        es.map((data, callback) => {
            if (data.fieldName === "f1") {
                console.log(`Processing ${data.value}...`);
                curData = {
                    url: `http://www.dh-jac.net/db1/books-e/results.php?f64=${
                        data.value
                    }`,
                    images: [],
                };
                results.push(curData);
            }

            if (fieldMapping[data.fieldName]) {
                curData[fieldMapping[data.fieldName]] = data.value;
            }

            if (data.syoseki2) {
                for (const entry of data.syoseki2) {
                    const imgFields = Object.values(entry)[0];
                    for (const imgField of imgFields) {
                        if (imgField.fieldName === "f8") {
                            // Check if the image has been downloaded
                            if (
                                fs.existsSync(
                                    `./public-images/${imgField.value}`,
                                )
                            ) {
                                curData.images.push(imgField.value);
                            }
                        }
                    }
                }
            }

            callback();
        }),
    )
    .on("end", () => {
        console.log("Writing out results...");
        const filteredResults = results.filter(
            (data) => data.images.length > 0,
        );
        fs.writeFileSync(
            "./ritsumeikan-metadata.json",
            JSON.stringify(filteredResults),
        );
    });
