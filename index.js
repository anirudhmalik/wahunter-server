const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("cyclic-dynamodb");

const { upload, getSignedUrl } = require("./upload");

app.use(bodyParser.json());

app.post("/upload", upload.single("file"), async function (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.send("No id passed in body!");
  }
  const { originalname, location } = req.file;
  const item = await db.collection("wahunter").set(id, {
    fileName: originalname,
    url: location,
  });
  res.send(item);
});

app.get("/list", async function (req, res) {
  const items = await db.collection("wahunter").list();
  res.send(items);
});

app.get("/file", async function (req, res, next) {
  const item = await db.collection("wahunter").get(req.query.id);
  console.log(item.props)
  const {fileName} = item.props;
  const url = await getSignedUrl(fileName);
  res.send(url);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`);
});
