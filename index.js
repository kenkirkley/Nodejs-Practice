const fs = require("fs");
const http = require("http");
const url = require("url");

// blocking, synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know abou the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// non blocking, async
// error first callback
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//         console.log("File written");
//       });
//     });
//   });
// });
console.log("File Reading...");

// SERVER

// If you only need to read the data once, do it outside the callback

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview
  if (pathName === "/" || pathName === "/overview") {
    res.end("overview");
  }

  // Product
  else if (pathName === "/product") {
    res.end("product");
  }
  // API
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // 404
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello world"
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server Listening");
});
