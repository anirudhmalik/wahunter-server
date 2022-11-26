const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("cyclic-dynamodb");

const { upload, getSignedUrl } = require("./upload");

app.use(bodyParser.json());

app.post("/upload", upload.single("file"), async function (req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).send("No id passed in body!");
    }
    const { originalname, location } = req.file;
    const item = await db.collection("wahunter").set(id, {
      fileName: originalname,
      url: location,
    });
    res.status(201).send(item);
  } catch (error) {
    return res.status(404).send("Failed to upload/update db!");
  }
});

app.get("/list", async function (req, res) {
  try {
    const items = await db.collection("wahunter").list();
    res.status(201).send(items);
  } catch (error) {
    return res.status(404).send("Failed to get data from db!");
  }
});

app.get("/file", async function (req, res) {
  try {
    const item = await db.collection("wahunter").get(req.query.id);
    if (item != null && item?.props) {
      const { fileName } = item?.props;
      const url = await getSignedUrl(fileName);
      res.status(201).send(url);
    } else {
      return res.status(404).send("No data for requested id!");
    }
  } catch (error) {
    return res.status(404).send("Failed to get download link from db!");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`wahunter-server is up and listening for connection!`);
});
