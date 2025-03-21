import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

// SQL запросы
const SQL_getAllSeminars = 'SELECT * FROM seminars';
const SQL_getSeminarsById = 'SELECT * FROM seminars WHERE id = ?';
const SQL_editSeminar = 'UPDATE seminars SET ? WHERE id = ?';
const SQL_deleteSeminar = 'DELETE FROM seminars WHERE id = ?';
const SQL_incrementViews = 'UPDATE seminars SET views = views + 1 WHERE id = ?';

// Получение всех семинаров
router.get('/', async (req, res) => {
  try {
    const [rows] = await req.db.query(SQL_getAllSeminars);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Ошибка при получении данных из базы данных',
      error: err.message,
    });
  }
});

// Редактирование семинара
router.patch('/:id', async (req, res) => {
  const seminarId = parseInt(req.params.id);
  const updates = req.body;

  try {
    if (!updates) {
      return res.status(404).json({
        message: 'Нет данных для обновления',
      });
    }
    const [result] = await req.db.query(SQL_editSeminar, [updates, seminarId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Семинар не найден',
      });
    }

    res.json({
      message: 'Семинар успешно обновлён',
      updates,
    });
  } catch (err) {
    console.error('Ошибка сервера', err);
    res.status(500).json({
      message: 'Ошибка сервера',
      error: err.message,
    });
  }
});

// Удаление семинара
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [seminarExists] = await req.db.query(SQL_getSeminarsById, [id]);

    if (seminarExists.length === 0) {
      return res.status(404).json({
        message: 'Семинар не найден',
      });
    }

    await req.db.query(SQL_deleteSeminar, [id]);

    res.status(200).json({
      message: 'Семинар успешно удалён',
    });
  } catch (err) {
    console.error('Ошибка при удалении семинара', err);
    res.status(500).json({
      message: 'Ошибка сервера',
      error: err.message,
    });
  }
});


// Получение семинара по ID
router.get('/:id', async (req, res) => {
  const seminarId =  parseInt(req.params.id);

  try {

    const [rows] = await req.db.query(SQL_getSeminarsById, [seminarId])

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Семинар не найден'
      })
    }
    res.json(rows[0])
  } catch(err) {
    console.error(err);
  }
})

// Увеличение количества просмотров
router.post('/:id/view', async (req, res) => {
  const seminarId = parseInt(req.params.id);

  try {
    await req.db.query(SQL_incrementViews, [seminarId]);
    res.json({ message: 'Просмотр засчитан' });
  } catch (error) {
    console.error('Ошибка при обновлении просмотров:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// router.get('/comments', async (req, res) => {
//   try {
//     const [results] = await db.query(SQL_getComments); // Получаем данные
//     res.json(results); // Отправляем данные клиенту
//   } catch (error) {
//     console.error('Ошибка при выполнении запроса', error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });



export default router;
