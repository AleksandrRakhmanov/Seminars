import express from 'express';

const router = express.Router();

const SQL_getComments = 'SELECT * FROM comments';

router.get('/comments', async (req, res) => {
    try {
      const [rows] = await req.db.query(SQL_getComments);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Ошибка при получении данных из базы данных',
        error: err.message,
      });
    }
  });

export default router;
