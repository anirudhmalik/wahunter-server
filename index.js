const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { upload } = require("./upload");

app.use(bodyParser.json());

app.post('/upload', upload.single('fileDb'), function(req, res, next) {
  res.send(req.file)
  console.log("body>>>>>> ",req.body)
})

app.get('/list', function(req, res, next) {
  res.send('Under Contruction')
})


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
