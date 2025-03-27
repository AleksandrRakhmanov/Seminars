import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { seminarId } = req.body;

  if (!seminarId) {
    return res.status(400).json({
      message: 'ID семинара не указан',
    });
  }

  try {
    // Получаем нужный семинар по ID
    const [seminar] = await req.db.query('SELECT * FROM seminars WHERE id = ?', [seminarId]);

    if (seminar.length === 0) {
      return res.status(400).json({
        message: 'Семинар не найден',
      });
    }

    // Проверяем существует ли запрашиваемый семинар в таблице yourSeminars
    const [existingSeminar] = await req.db.query('SELECT * FROM yourSeminars WHERE id = ?', [seminarId]);

    if (existingSeminar.length > 0) {
      return res.status(400).json({
        message: 'Этот семинар уже добавлен',
      });
    }


    await req.db.query(
      'INSERT INTO yourSeminars(id, title, description, author, views, date, time, photo) VALUES(?,?,?,?,?,?,?,?)',
      [
        seminar[0].id,
        seminar[0].title,
        seminar[0].description,
        seminar[0].author,
        seminar[0].views,
        seminar[0].date,
        seminar[0].time,
        seminar[0].photo,
      ]
    );

    res.json({
      message: 'Семинар успешно добавлен',
    });
  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({
      message: 'Ошибка при добавлении семинара',
      error: err.message, // Отправляем сообщение об ошибке
    });
  }
});

export default router;
