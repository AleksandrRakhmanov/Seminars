import express, { query } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Регистрация пользователя
router.post('/registration', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    // Проверяем, существует ли пользователь с таким email или username
    const [existingUser] = await req.db.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем пользователя в базу данных
    await req.db.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    // Ищем пользователя в базе данных
    const [user] = await req.db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    // Сравниваем пароль
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Создаем JWT-токен
    const token = jwt.sign(
      { username: user[0].username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
