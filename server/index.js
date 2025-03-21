import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import seminarsRouter from './routes/seminars.js';
import authRouter from './routes/auth.js';
import comments from './routes/comments.js'
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к БД
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

// Добавляем соединение с базой данных в объект запроса
app.use((req, res, next) => {
  req.db = connection;
  next();
});

// Подключение роутов
app.use('/', indexRouter);
app.use('/seminars', seminarsRouter);
app.use('/auth', authRouter);
app.use('/', comments)

app.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Доступ разрешен',
    user: req.user,
  });
});


app.listen(5005, () => {
  console.log('Server OK');
});
