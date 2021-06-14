import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt')
    .then((data) => res.send(data))
    .catch((error) => res.sendStatus(404));
});

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Somthing went wrong' });
});
