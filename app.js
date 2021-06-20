
const http = require("http");
const { getCompanyInRange } = require("./handlers/company");
const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === "/getRange") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });

      req.on("end", () => {
        console.log(body);
        getCompanyInRange(body);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(getCompanyInRange(body)));
      });
    }
  }
});
server.listen(9000);

