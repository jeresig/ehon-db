const JSONStream = require("JSONStream");
const es = require("event-stream");

const fieldMapping = {
    f1: "id",
    f3: "title",
    f7: "creator",
    f9: "genres",
    //f11: "date",
    //f33: "source",
    //f34: "sourceURL",
};

const urlBase = "http://www.dh-jac.net/db1/books-e/results.php?f64=";

module.exports = {
    files: [
        "An all-in_one.json file containing only records from a single source.",
    ],

    processFiles(fileStreams, callback) {
        let lastUrl = "";
        let curData = null;
        const results = [];

        fileStreams[0]
            .pipe(JSONStream.parse([true, true, "metadata", true]))
            .pipe(
                es.map((data, callback) => {
                    if (data.fieldName === "f1") {
                        curData = {
                            lang: "ja",
                            url: urlBase + data.value,
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
            .on("error", callback)
            .on("end", () => {
                callback(null, results);
            });
    },
};
