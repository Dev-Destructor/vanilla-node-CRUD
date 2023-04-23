const http = require("http");
const { errorLog, systemLog } = require("./logs/logHandler");
const {
  getItems,
  getItem,
  updateItem,
  createItem,
  removeItem,
} = require("./controllers/itemsController");
// const { itemsRoute } = require("./routes/itemsRoute");

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/items" && req.method === "GET") {
    const id = req.url.split("/")[3];
    getItems(req, res, id);
  } else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getItem(req, res, id);
  } else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateItem(req, res, id);
  } else if (req.url === "/api/items" && req.method === "POST") {
    createItem(req, res);
  } else if (
    req.url.match(/\/api\/items\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    removeItem(req, res, id);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, (err) => {
  if (err) {
    errorLog(err);
  }
  systemLog(`Server is listening to port ${port}`, 200);
  console.log("Server is listening to port " + port);
});
