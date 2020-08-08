"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// existing users
var users = [
    {
        data1: {
            firstName: 'JOHN0000',
            lastName: 'MICHAEL000',
            clientId: '9994567'
        }
    },
    {
        data2: {
            firstName: 'JOHN',
            lastName: 'MICHAEL',
            clientId: '999-4567'
        }
    }
];
app.use(bodyParser.json());
app.post('/api/v1/parse', function (req, res) {
    var data = req.body.data;
    var dataArr = data.split('');
    var clientId = dataArr.splice(data.lastIndexOf('0') + 1).join('');
    var isPrevZero = false;
    var breakIndex;
    for (var e in dataArr) {
        if (dataArr[e] === '0')
            isPrevZero = true;
        if (isPrevZero && data[e] !== '0') {
            breakIndex = e;
            break;
        }
    }
    var firstName = data.substring(0, breakIndex);
    var lastName = data.substring(breakIndex, data.lastIndexOf('0'));
    res.json({ firstName: firstName, lastName: lastName, clientId: clientId });
});
app.post('/api/v2/parse', function (req, res) {
    var data = req.body.data;
    var dataArr = data.split('');
    var clientId = dataArr.splice(data.lastIndexOf('0') + 1).join('');
    var isPrevZero = false;
    var breakIndex;
    for (var e in dataArr) {
        if (dataArr[e] === '0')
            isPrevZero = true;
        if (isPrevZero && data[e] !== '0') {
            breakIndex = e;
            break;
        }
    }
    var firstName = dataArr.splice(0, data.indexOf('0')).join('');
    var lastName = dataArr.filter(function (e) { return e !== '0'; }).join('');
    res.json({
        firstName: firstName,
        lastName: lastName,
        clientId: clientId.substring(0, 3) + '-' + clientId.substring(3)
    });
});
app.listen(3000, function () { return console.log('server started'); });
