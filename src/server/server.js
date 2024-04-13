import express from 'express';
import http from 'http';
import path from 'path';

const __dirname = path.resolve();
const app = express();

app.use(express.static(`${__dirname}/public`));

const server = http.createServer(app);
server.listen(3000);
