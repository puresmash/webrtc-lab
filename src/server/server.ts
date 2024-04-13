import express from 'express';
import http from 'http';

const app = express();

app.use(express.static(`${__dirname}/public`));

const server = http.createServer(app);
server.listen(3000);
