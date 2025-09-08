
import * as dotenv from "dotenv";
import * as http from "node:http";
import * as url from "node:url";
import * as path from "node:path";
import * as fs from "node:fs/promises";
dotenv.config();

const PORT = process.env.PORT! || 3000;
const LOCALHOST = process.env.LOCALHOST! || "localhost";

const server = http.createServer( async (req, res) => {
    // console.log("Kérés url-je: ",req.url);
    // console.log(`A kérés fejléce: ${req.headers}`);
    console.log(`A kérés http-metódusa: ${req.method}`);
    console.log(`A projekt server.js fájljának url-je: ${import.meta.url}`);

    // Statikus állomány (most az index.html) útvonala:
    const __filename = url.fileURLToPath(import.meta.url);
    console.log(`filename: ${__filename}`);
    const __dirname = path.dirname(__filename);
    const indexPath = path.join(__dirname, "index.html");
    console.log(indexPath);

    /* res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write("Ez egy egyszerű http-szerver üzenete.\n")
    res.end("Helló itt a szerever!"); */
    const html = await fs.readFile(indexPath);
    if (req.url === "/" && req.method === "GET"){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(html)
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/text");
        res.end("Page not found!");
    }

});

server.listen(PORT, () => {
    console.log(`The server is running on http://${LOCALHOST}:${PORT}`);
});
