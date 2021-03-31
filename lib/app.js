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
      fs.readFile(`public/${request.path}`)
        .then((data) =>
          socket.end(createResponse({ body: data, contentType: 'text/html' }))
        );
    } else {
      socket.end(createResponse({ body: `${request.path}`, contentType: 'text/html' }));
    }

  });
})

module.exports = app;


// const app = net.createServer(async (socket) => {
//   console.log('We are running!');
//   socket.on('data', data => {
//     const request = parseRequest(data.toString());
//     console.log(request.path);
//     if (request.path === '/index.html') {
//       console.log('index');
//       fs.readFile(`public/request.path`).then((data) => {
//         socket.end(createResponse({ body: data, contentType: "text/html" }))
//       });
//     } else {
//       console.log(request.path);
//       socket.end(createResponse({ body: '<h1>heresd</h1>', contentType: 'text/html' }));
//     }
//   });
// })