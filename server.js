//Install express server
const express = require("express");
const app = express();
// const fs = require("fs");
var cors = require("cors");
// Serve only the static files form the dist directory
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(__dirname + "/dist"));
app.use(function(req, res, next) {
  var allowedOrigins = ["http://http://52.34.207.5:4223/", "localhost:4223"];
  var origin = req.headers.host;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "accept, authorization, content-type, x-requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  next();
});
// const https = require('https');
const http = require("http");

app.get("/", function(req, res) {
  return res.end("dfklaaksdjasjkd-----");
});

/**
 * On refersh getting the cannot get url error
 */
app.get("*", function(req, res) {
  res.sendfile("./dist/index.html");
});

// const privateKey = fs.readFileSync('./certs/stagingsdei_com.key', 'utf8');
// const certificate = fs.readFileSync('./certs/ed44c8303428078f.crt', 'utf8');
// var ca = fs.readFileSync('./certs/gd_bundle-g2-g1.crt');
// const httpsOptions = {key: privateKey, cert: certificate, ca: ca};

const server = http.createServer(app);
// const server = https.createServer(httpsOptions, app);

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 4201);
server.listen(process.env.PORT || 4223);
