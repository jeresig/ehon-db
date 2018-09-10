const async = require("async");
const request = require("request-promise-native");

const urls = [
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
    "http://localhost:4213/index/images/2537634801",
    "http://localhost:4213/index/images/3276924603",
];

const startTime = new Date().getTime();

async.eachLimit(
    urls,
    6,
    async (url) => await request(url),
    () => {
        console.log((new Date().getTime() - startTime) / urls.length);
    },
);
