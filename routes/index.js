var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { layout: null });
});

router.get('/data1.js', function(req, res, next) {
    var options = {
        hostname: 'api.blockchain.info',
        path: '/charts/n-unique-addresses?cors=true&timespan=all&format=json',
        method: 'GET'
    };

    var _req = https.request(options, function(_res) {
        var size = 0;
        var chunks = [];
        _res.on('data', function(chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        _res.on('end', function() {
            if (_res.statusCode === 200) {
                var data = Buffer.concat(chunks, size);
                var info = JSON.parse(data.toString());
                var address = JSON.stringify(info.values);
                res.set('Content-Type', 'application/x-javascript');
                res.send('var address = ' + address);
            } else {
            	console.log('CodeError')
                console.log(_res.statusCode);
            }
        });
    });

    _req.on('error', function(e) {
        console.log('error');
        console.log(e);
    });

    // _req.write(_postData);
    _req.end();
});

router.get('/data2.js', function(req, res, next) {
    var options = {
        hostname: 'api.feixiaohao.com',
        path: '/coinhisdata/bitcoin',
        method: 'GET'
    };

    var _req = https.request(options, function(_res) {
        var size = 0;
        var chunks = [];
        _res.on('data', function(chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        _res.on('end', function() {
            if (_res.statusCode === 200) {
                var data = Buffer.concat(chunks, size);
                var info = JSON.parse(data.toString());
                var marketvalue = JSON.stringify(info.vol_usd);
                res.set('Content-Type', 'application/x-javascript');
                res.send('var marketvalue = ' + marketvalue);
            } else {
            	console.log('CodeError')
                console.log(_res.statusCode);
            }
        });
    });

    _req.on('error', function(e) {
        console.log('error');
        console.log(e);
    });

    // _req.write(_postData);
    _req.end();
});

module.exports = router;