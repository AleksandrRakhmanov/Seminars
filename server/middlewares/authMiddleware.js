import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовка Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  try {
    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Добавляем данные пользователя в запрос
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};
