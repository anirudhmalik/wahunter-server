const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { upload } = require("./upload");

app.use(bodyParser.json());

app.post("/upload", function (req, res) {
  const { id } = req.body;
  if (!id) {
    res.send("BLalalala");
  }
  let uploadOne = upload.single(id);
  console.log("3>>>>>>> ", uploadOne);
  uploadOne(req, res, async (err) => {
    if (err) {
      return res.status(400).send(
        JSON.stringify({
          message: "File submission failed.",
          file: [],
        })
      );
    }
    return res.status(201).send(
      JSON.stringify({
        message: "File uploaded successfully.",
        file: req.file,
      })
    );
  });
});

app.get("/list", function (req, res, next) {
  res.send("Under Contruction");
});

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
app.use("*", (req, res) => {
  res.sendStatus(404).end();
});

// /////////////////////////////////////////////////////////////////////////////
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`);
});
