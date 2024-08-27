import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filepath;

      if (req.url === "/") {
        filepath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filepath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("404 not found");
      }

      const data = await fs.readFile(filepath);
      res.setHeader("Content-Type", "text/plain");
      res.write(data);
      res.end();
    } else {
      throw new Error(`this server does not support ${req.method} method`);
    }
  } catch (error) {
    req.statusCode(500);
    throw new Error(`Server Error`);
  }
});

server.listen(PORT, () => {
  console.log(`server is listenting to port ${PORT}`);
});
