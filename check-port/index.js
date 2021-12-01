const net = require('net');

function checkConnection(host, port, timeout) {
  return new Promise(function(resolve, reject) {
    timeout = timeout || 10000;
    const timer = setTimeout(function() {
      reject('timeout');
      socket.end();
      process.exit(1)
    }, timeout);
    const socket = net.createConnection(port, host, function() {
      clearTimeout(timer);
      resolve();
      socket.end();
    });
    socket.on('error', function(err) {
      clearTimeout(timer);
      reject(err);
    });
  });
}

const params = process.argv.splice(2)

checkConnection(params[0], params[1]).then(function() {
  console.log(`[${params[0]}:${params[1]}] is opening`)
}, function(err) {
  console.log(err)
})
