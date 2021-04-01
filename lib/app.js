const net = require('net');
const fs = require('fs').promises;
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    fs.readFile(`public${request.path}`)
      .then((data) =>
        socket.end(createResponse({ body: data, contentType: 'text/html' }))
      )
      .catch((err) => {
        socket.end(createResponse({ body: `${err.message}`, contentType: 'text/plain' }))
      });
  });
})

module.exports = app;
