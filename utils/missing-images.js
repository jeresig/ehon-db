const fs = require("fs");
const path = require("path");

const images = fs.readFileSync("./public-image-urls.txt", "utf8").split("\n");

for (const imageURL of images) {
    const fileName = /[^\/]*$/.exec(imageURL)[0];
    //console.log(fileName);
    if (!fs.existsSync(path.join("public-images", fileName))) {
        console.log(imageURL);
    }
}
