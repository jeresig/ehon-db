const fs = require("fs");
const path = require("path");
const util = require("util");

const glob = require("glob");
const pastec = require("pastec");
const farmhash = require("farmhash");
const progress = require("cli-progress");

const pastecServer = pastec({
    server: "localhost:4212",
});

const readFile = util.promisify(fs.readFile);
const addToPastec = util.promisify(pastecServer.add);

const dir = path.resolve(process.argv[2]);
const fileGlob = path.join(dir, "**", "*.@(jpg|jpeg)");

const bar = new progress.Bar({
    etaBuffer: 1000,
    stopOnComplete: true,
});

glob(fileGlob, async (err, files) => {
    bar.start(files.length, 0);

    for (let i = 0; i < files.length; i++) {
        try {
            const file = files[i];
            const fileContents = await readFile(file);
            const hash = farmhash.hash32(fileContents).toString();
            await addToPastec(file, hash).catch((err) => console.log(file));
        } catch (e) {
            console.log(file);
        }

        bar.update(i + 1);
    }
});
