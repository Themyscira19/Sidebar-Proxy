const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const request = require("request");

const app = express();

const port = process.env.PORT || 4004;

app.use(express.static(__dirname));

app.use((req, res, next) => {
  let url = req.url.split("/");
  
  let path = url.slice(2).join("/");
  let endpoint = url[1];
  if (endpoint === "main") {
    let proxy = "http://ec2-3-17-128-193.us-east-2.compute.amazonaws.com/" + path;
    request(proxy).pipe(res);
  } else if (endpoint === "details") {
    let proxy = "http://ec2-18-218-63-15.us-east-2.compute.amazonaws.com/" + path;
    request(proxy).pipe(res);
  } else if (endpoint === "critics") {
    let proxy = "http://ec2-3-16-138-173.us-east-2.compute.amazonaws.com/" + path;
    request(proxy).pipe(res);
  } else if (endpoint === "sidebar") {
    let proxy = "http://18.222.207.221:9004/" + path;
    request(proxy).on('error', (err) => {
        console.log(err)
    }).pipe(res);
  }
});

app.get("/", (req, res) => {});


app.listen(port, function () {
  console.log('Justin\'s Proxy FEC component listening on port ' + port);
});