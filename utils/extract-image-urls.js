const fs = require("fs");
const zlib = require("zlib");
const JSONStream = require("JSONStream");
const es = require("event-stream");

let lastURL = "";

fs.createReadStream("./all-in-one.json.gz")
    .pipe(zlib.createGunzip())
    .pipe(
        JSONStream.parse([
            true,
            true,
            "metadata",
            true,
            "syoseki2",
            true,
            true,
            true,
        ]),
    )
    .pipe(
        es.map((data, callback) => {
            if (data.fieldName === "f6") {
                lastURL = data.value;
            }

            if (data.fieldName === "f8") {
                //console.log(`${lastURL}${data.value}`);
                return callback(null, `${lastURL}${data.value}\n`);
            }

            callback();
        }),
    )
    .pipe(fs.createWriteStream("./image-urls.txt"));
