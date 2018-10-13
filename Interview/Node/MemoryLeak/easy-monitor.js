'use strict';
const easyMonitor = require('easy-monitor');
easyMonitor('Mercury');
const express = require('express');
const app = express();

var leakArray = [];
var leak = function () {
  leakArray.push(new Array(2000000));
};

app.get('/hello', function (req, res, next) {
  leak()
  res.send('hello');
});

app.listen(8082);