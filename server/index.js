process.title = "gnou"
const express = require("express");
const apiPath = require("./routes/api.js");
const sockets = require('./services/sockets')
const cors = require('cors')
const app = require('express')();
const bodyParser = require('body-parser')
const path = require('path')
// App setup
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiPath);
// Static files
app.use(express.static("public"));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
const http = require('http').createServer(app);
sockets.connect(http)
http.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});