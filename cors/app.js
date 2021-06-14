import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5502',
  optionsSuccessStatus: 200,
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors(corsOptions));
/* 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5502');
  res.setHeader('Access=Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  next();
});
 */

app.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.send('Welcome!');
});

app.listen(8080);
