const http = require('http');
const fs = require('fs');
const port = 8080;

const contentTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  plain: 'text/plain',
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    let filePath = '';
    let contentType = contentTypes.html;

    switch (req.url) {
      case '/':
        filePath = 'index.html';
        break;
      case '/dutchPay':
        filePath = './static/dutchPay.html';
        break;
      case '/static/css/indexStyle.css':
        filePath = './static/css/indexStyle.css';
        contentType = contentTypes.css;
        break;
      case '/static/css/resultStyle.css':
        filePath = './static/css/resultStyle.css';
        contentType = contentTypes.css;
        break;
      case '/static/js/dutch-pay.js':
        filePath = './static/js/dutch-pay.js';
        contentType = contentTypes.js;
        break;
      default:
        res.writeHead(404, { 'Content-Type': contentTypes.plain });
        return res.end('Not Found');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': contentTypes.plain });
        return res.end('서버 에러');
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});