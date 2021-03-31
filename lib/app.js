const net = require('net');
const fs = require('fs').promises;
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

// create server
// check user path using parseRequest()
// if user path === /index.html
// - read file in public directory using fs.readFile
// - return file as body of response using createResponse()
// - if no file found, respond with Not Found message
//
// write tests to check for path, check for file (found and not found)
// clean code

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    if (request.path === '/index.html') {
      fs.readFile(`public${request.path}`)
        .then((data) =>
          socket.end(createResponse({ body: data, contentType: 'text/html' }))
        )
        .catch((err) => {
          socket.end(createResponse({ body: `${err.message}`, contentType: 'text/plain', status: `${err.status}` }))
        });
    } else {
      socket.end(createResponse({ body: `${request.path}`, contentType: 'text/html' }));
    }
  });
})

module.exports = app;
