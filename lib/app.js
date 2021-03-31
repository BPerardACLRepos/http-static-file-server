const net = require('net');
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
  console.log('We are running!');
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    if (request.path === '/favicon.ico') {
      console.log(`You're an icon.`)
    } else if (request.path === '/index.html') {
      fs.readFile(request.path).then((data) =>
        socket.end(createResponse({ body: data, contentType: "text/html" }))
      );
    });
}
    socket.end(`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 2\r
\r
hi`);
  });
});

module.exports = app;
