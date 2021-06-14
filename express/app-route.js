import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: 'id',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};
app.use(express.static('public', options));

app.use('/posts', postRouter);
app.use('users', userRouter);

app.listen(8080);
