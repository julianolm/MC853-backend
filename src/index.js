import express from "express";
import cors from "cors";
import { sleep } from "./utils.js";
import fs from "fs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  await sleep(3000);
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  const users = [
    { id: 1, name: "John", email: "johjonis@gmark.com" },
    { id: 2, name: "Jane", email: "jenisjoplen@gmark.com" },
  ];
  res.send(users);
});

app.post("/other-route", async (req, res) => {
  res.send(users);
});

app.post("/statistics-react-query", async (req, res) => {
  console.log(req.body);
  const data = req.body;

  const content = `${data.time0},${data.time1},${data.loadSize}\n`;
  fs.writeFileSync("statistics-react-query.csv", content, { flag: "a" });

  res.send("ok");
});

app.post("/statistics-pure-fetch", async (req, res) => {
  console.log(req.body);
  const data = req.body;

  const content = `${data.time0},${data.time1},${data.loadSize}\n`;
  fs.writeFileSync("statistics-pure-fetch.csv", content, { flag: "a" });

  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
