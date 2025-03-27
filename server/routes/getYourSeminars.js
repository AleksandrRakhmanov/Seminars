import express from 'express';
const router = express.Router();


router.get('/', async (req, res) => {

    try {
        const [seminars] = await req.db.query('SELECT * FROM yourSeminars')
        res.json(seminars)

    }catch(err) {
        console.error("Ошибка:",err);
        res.status(500).json({
            message: 'Ошибка при получении семинаров',
            error: err.message
        })
    }
})





export default router;
