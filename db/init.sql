-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql
-- Время создания: Апр 28 2025 г., 12:24
-- Версия сервера: 8.0.41
-- Версия PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cosmetic_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `username` varchar(250) NOT NULL,
  `rating` varchar(250) NOT NULL,
  `url_photo` varchar(512) NOT NULL,
  `comment_text` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `username`, `rating`, `url_photo`, `comment_text`) VALUES
(1, 'Джон Синович', '5', 'https://www.film.ru/sites/default/files/people/1455208-2456939.jpg', 'Отличный семинар, много полезной информации!'),
(2, 'Рикардо Милос', '3', 'https://static.wikitide.net/rytpwiki/thumb/9/97/%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg/300px-%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg', 'Не смог дослушать семинар и пустился в пляс!'),
(3, 'Стив Рэмбов', '4', 'https://i1.sndcdn.com/artworks-xInJihCSO89EWHcq-w8CPXQ-t240x240.jpg', 'Хорошо, но хотелось бы больше практики'),
(4, 'Алекс', '4', 'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg', 'Текстовый текст к этому прекрасному семинару');

-- --------------------------------------------------------

--
-- Структура таблицы `seminars`
--

CREATE TABLE `seminars` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `date` varchar(10) DEFAULT NULL,
  `time` varchar(5) DEFAULT NULL,
  `photo` varchar(512) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT '0.0',
  `views` int DEFAULT '0',
  `author` varchar(100) DEFAULT 'Kosmoteros'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `seminars`
--

INSERT INTO `seminars` (`id`, `title`, `description`, `date`, `time`, `photo`, `rating`, `views`, `author`) VALUES
(1, 'Новинки Kosmoteros', 'Обзор новых средств и методик от Kosmoteros.', '01.02.2025', '10:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBl1SYS0QSlqmk0IkIK9M7C6i00_1Spk_9Q_tHjJiu7lcsoFdMF0ngCa7BuPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.8, 1417, 'Ирина Петрова'),
(2, 'Семинар по инновациям в косметологиx', 'Разбор новейших тенденций в косметологии и трендовых продуктов.', '03.02.2025', '11:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBg0y8Q0wGlqmk0IhdZ9p3P4SVo_1Spk_9Q_tHgci-5lpx7RtdR1StSaLRtPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.9, 1370, 'Анна Смирнова'),
(3, 'Технологии ухода за кожей', 'Изучение современных методик ухода за кожей с применением новейших технологий.', '05.02.2025', '12:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBh2ScU1wKlqmk0IkUI85-b5Cpr_1Spkv9Q_tG6Ly3rlst6QIAH0ioGaOU4Ppof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.7, 1102, 'Мария Иванова'),
(4, 'Актуальные тренды в бьюти-индустрии', 'Обсуждение современных трендов и методик в бьюти-индустрии.', '07.02.2025', '13:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBh2ScU1wKlqmk0IhsIoJObti41_1Spkv9Q_tHjIyG9xpxyFddW3nAGYeVtPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.5, 871, 'Елена Кузнецова'),
(5, 'Секреты профессионалов Kosmoteros', 'Семинар с участием ведущих специалистов по использованию средств Kosmoteros.', '09.02.2025', '14:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSZh0ioQ0QSlqmk0IkFfos7K5S84_1Spkv9Q_tHjIX67wZgvFIIC1CxUO7A4Ppof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.9, 1506, 'Ольга Соколова'),
(6, 'Эффективные методики омоложения', 'Обучение современным методикам омоложения и ухода за кожей.', '11.02.2025', '15:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBh1ygR0ASlqmk0IhIIosqctX8__1Spk_9Q_tHgJym5lMt5RtZR3ngDb7ZkPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.6, 920, 'Наталья Морозова'),
(7, 'Инновационные средства Kosmoteros', 'Демонстрация новых продуктов Kosmoteros и их уникальных свойств.', '13.02.2025', '16:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSFk2SsS0wClqmk0IkdQp8qYsC1v_1Spk_9Q_tHjcnm_ls99EdcE134DbblkPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.8, 1350, 'Татьяна Волкова'),
(8, 'Современные тренды в уходе за кожей', 'Семинар о новейших трендах в уходе за кожей и эффективных методах лечения.', '15.02.2025', '17:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBh2ScU1wKlqmk0IhNcrJ2ctS84_1SpkP9Q_tG7dnu1kJwpRtED0ChVO7hpPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.4, 764, 'Светлана Павлова'),
(9, 'Мастер-класс от Kosmoteros', 'Практический мастер-класс по использованию инновационных косметических средств.', '17.02.2025', '18:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBg0y8Q0wGlqmk0IkFf9M6ZsXlo_1Spl_9Q_tG6dCvsxc96F9YB0XECabA_Ppof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.9, 1600, 'Александра Новикова'),
(10, 'Будущее косметологии с Kosmoteros', 'Обсуждение перспектив развития косметологии и роли инноваций.', '19.02.2025', '19:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBg0y8Q0wGlqmk0IkZarZ_C4Cg9_1Spl_9Q_tG7Iim-k8t7QIIG0SwBOOU-Ppof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA', 4.7, 1050, 'Виктория Федорова');

-- --------------------------------------------------------

--
-- Структура таблицы `yourSeminars`
--

CREATE TABLE `yourSeminars` (
  `id` int NOT NULL,
  `title` varchar(250) NOT NULL,
  `author` varchar(50) NOT NULL,
  `views` int NOT NULL,
  `date` varchar(250) NOT NULL,
  `time` varchar(15) NOT NULL,
  `photo` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `yourSeminars`
--

INSERT INTO `yourSeminars` (`id`, `title`, `author`, `views`, `date`, `time`, `photo`) VALUES
(2, 'Семинар по инновациям в косметологиx', 'Анна Смирнова', 1266, '03.02.2025', '11:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBg0y8Q0wGlqmk0IhdZ9p3P4SVo_1Spk_9Q_tHgci-5lpx7RtdR1StSaLRtPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA'),
(1, 'Новинки Kosmoteros', 'Ирина Петрова', 1416, '01.02.2025', '10:00', 'https://yastatic.net/naydex/shedevrum/NsV9JO120/8a9fd0dHnuH/emY4U76weNjef_TgCZBlR2eKFg95SQ_mwj92FFUxze85VQlRIe_yHdzlSBl1SYS0QSlqmk0IkIK9M7C6i00_1Spk_9Q_tHjJiu7lcsoFdMF0ngCa7BuPpof4JBpbvJbjdJ-E2i2hPNpNMFxNpdtU4wY66pbDA');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `seminars`
--
ALTER TABLE `seminars`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
