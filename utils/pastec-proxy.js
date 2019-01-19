const fs = require("fs");
const http = require("http");
const httpProxy = require("http-proxy");

const port = 4213;
const servers = ["http://localhost:4212"];
const cacheFile = "pastec-cache.json";
const cacheSaveRate = 2 * 60 * 1000;
const returnEmptyForMissed = true;

let cache = {};
let cacheChanged = false;
let curServer = 0;

if (fs.existsSync(cacheFile)) {
    console.log(`Reading cache file ${cacheFile}...`);
    cache = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
}

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url.indexOf("/index/images/") >= 0) {
        if (cache[req.url]) {
            console.log("Cached:", req.url);

            // Respond from cache
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(cache[req.url]);
            res.end();
            return;
        } else if (returnEmptyForMissed) {
            console.log("Cache Miss:", req.url);

            // Create a fake response
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(
                '{"bounding_rects":[],"image_ids":[],"scores":[],"type":"SEARCH_RESULTS"}\n',
            );
            res.end();
            return;
        }
    }

    proxy.web(req, res, {target: servers[curServer % servers.length]});

    curServer += 1;
});

proxy.on("proxyRes", (proxyRes, req) => {
    if (req.method === "GET" && req.url.indexOf("/index/images/") >= 0) {
        console.log("Caching:", req.url);

        proxyRes.setEncoding("utf8");
        proxyRes.on("data", (data) => {
            cacheChanged = true;
            cache[req.url] = data;
        });
    } else {
        console.log(req.method, req.url);
    }
});

console.log(`Pastec proxy started on ${port}`);
server.listen(port);

setInterval(() => {
    if (cacheChanged) {
        console.log(`Saving cache file ${cacheFile}...`);
        fs.writeFileSync(cacheFile, JSON.stringify(cache));
        cacheChanged = false;
    }
}, cacheSaveRate);
