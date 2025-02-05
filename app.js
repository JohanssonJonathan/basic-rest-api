import { createServer } from 'node:http';
import { getNames, getName, createName, deleteName } from './controller.js'

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {

  // Get all reports
  if (req.url === '/' && req.method === 'GET') {
    return getNames(res);
  }

  // Create one report
  if (req.url === '/' && req.method === 'POST') {
    return createName(req, res);
  }

  // Get one report
  if (req.url.match(/\/.+/) && req.method === 'GET') {
    const id = req.url.split('/')[1];
    return getName(res, id)
  }

  // Delete one report
  if (req.url.match(/\/.+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[1];
    return deleteName(res, id)
  }

  // Nothing found 
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ "message" : "Not found" }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
