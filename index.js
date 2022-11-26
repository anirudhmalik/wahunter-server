const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { upload } = require("./upload");

app.use(bodyParser.json());

app.post('/upload', upload.single('file'), function(req, res) {
  res.send(req.file)
})

app.get('/list', function(req, res, next) {
  res.send('Under Contruction')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`);
});
