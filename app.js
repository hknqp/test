var request = require('request');
var async = require('async');
var socket = require('socket.io-client')('http://174.138.59.146:7226');
var count = 0;
socket.emit('ready', '');
socket.on('run', function (data) {
  count = data.start;
  var options = [];
  for (var i = data.start; i <= data.end; i++) {
    options.push({
      method: 'HEAD',
      uri: 'https://support.binance.com/hc/en-us/articles/' + i + '?' + (new Date()).getTime()
    })
  }
  async.map(options, function (option, callback) {
    request(option, function (error, response) {
      if (response && response.statusCode === 200) {
        socket.emit('done', option.uri);
        process.exit();
      }
      if (++count > data.end) {
        console.log('downtime ', data);
        socket.emit('done', null);
        setTimeout(function () {
          socket.emit('ready', '');
        }, 1000 * 15);
      }
    });
  }, function (err, results) {
    console.log(err, option);
  });
});

setTimeout(function () {
  process.exit();
}, 1000 * 60 * (Math.floor(Math.random() * 10) + 3));
