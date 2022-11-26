const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { upload } = require("./upload");

app.use(bodyParser.json());

app.post("/file_upload", upload.single("fileDb"), async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    res.send("No files to upload.");
    return;
  }
  res.send("ok").end();
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
