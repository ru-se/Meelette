import express from "express";

const app: express.Express = express();
const port = 8000;
var mysql = require('mysql');

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});