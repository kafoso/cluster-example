var express = require('express');
var sprintf = require('sprintf-js').sprintf;

var app = express();
var worker;

app.get('/', function (req, res) {
  return res.send(sprintf("This request was handled by worker #%s (pid: %d)", worker.id, process.pid));
});

app.listen(80);

module.exports = function(_worker){
  worker = _worker;
};
