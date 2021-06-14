import express from 'express';

const app = express();

app.use(express.json());

app.route('/posts').get((req, res, next) => {
  res.status(201).send('GET: /posts');
}).post((req, res, next) => {
  res.status(201).send('POST: /posts');
});

app.route('/posts/:id').put((req, res) => {
  res.status(201).send('PUT: /posts/:id');
}).delete((rq, res) => {
  res.status(201).send('DELETED: /posts/:id');
})

app.listen(8080);
