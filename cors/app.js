import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:5502',
    optionsSuccessStatus: 200,
    credentials: true, // Access-Control-Allow-Credentials: true
  })
);
/* 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5502');
  res.setHeader('Access=Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  next();
});
 */
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(8080);
