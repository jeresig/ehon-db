const path = require("path");
const glob = require("glob");
const async = require("async");
const request = require("request-promise-native");
const progress = require("cli-progress");

const bar = new progress.Bar({
    etaBuffer: 1000,
    stopOnComplete: true,
});

glob("data/*/images/*.jpg", (err, images) => {
    bar.start(images.length, 0);

    async.eachOfLimit(
        images,
        6,
        async (image, i) => {
            bar.update(i + 1);
            const hash = path.basename(image, ".jpg");
            const url = `http://localhost:4213/index/images/${hash}`;
            try {
                await request(url);
            } catch (e) {
                console.log(`ERROR: ${hash}`);
            }
        },
        (err) => {
            console.log("DONE", err);
        },
    );
});
