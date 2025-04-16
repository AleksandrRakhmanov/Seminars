import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import arrow_icon from './icons/arrow.png';
import watch_icon from './icons/watch_icon.png';
import icon_favorite from './icons/icon_favorite_light.png';
import count_icon from './icons/eye_icon.png';
import user_image from './icons/user_image.jpg';
import rate_icon from './icons/rate_icon.png';
import Loading from './Loader/Loader';
import styles from './SeminarPage.module.css';

const SeminarPage = () => {
  const { id } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addSeminar = async (seminarId) => {
    setIsModalOpen(true);

    try {
      // Преобразуем seminarId в число
      const idAsNumber = Number(seminarId);

      // Проверка, что преобразование прошло успешно
      if (isNaN(idAsNumber)) {
        throw new Error('seminarId должен быть числом');
      }

      console.log('Айдишник семинара' ,idAsNumber);

      const response = await axios.post('http://localhost:5005/addSeminar', {
        seminarId: idAsNumber,
      });

      console.log(response.data); // Обработка ответа от сервера
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для увеличения просмотров
  const incrementViews = async () => {
    try {
      await axios.post(`http://localhost:5005/seminars/${id}/view`);
    } catch (error) {
      console.error('Ошибка при увеличении просмотров:', error);
    }
  };

  // Функция для получения данных о семинаре
  const fetchSeminar = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/seminars/${id}`);
      setSeminar(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке семинара:', error);
    }
  };

  // Функция для получения комментариев
  const get_comments = async () => {
    try {
      const response = await axios.get('http://localhost:5005/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
    }
  };

  useEffect(() => {
    // Получаем данные о семинаре
    fetchSeminar();

    // Получаем комментарии к семинару
    get_comments();

    // Увеличиваем просмотры
    incrementViews();
  }, [id]);

  // Окно загрузки семинаров
  if (!seminar) {
    return <Loading />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.seminarsContainer}>
        <div className={styles.allElementsInCard}>
          <Link to="/seminars" className={styles.back_btn_container}>
            <img className={styles.arrow_icon} src={arrow_icon} alt="arrow" />
            <p className={styles.backBtn}>Назад</p>
          </Link>
          <div className={styles.imgAndElementsContainer}>
            <img
              className={styles.seminar_image}
              src={seminar.photo}
              alt="film"
            />
            <div className={styles.elements}>
              <p className={styles.seminar_name}>{seminar.title}</p>

              <div className={styles.seminar_rate_container}>
                <img className={styles.rate_icon} src={rate_icon} />
                <div className={styles.seminar_rate}>{seminar.rating}</div>
              </div>
              <button
                className={styles.addFavoriteBtn}
                onClick={() => addSeminar(id)}
              >
                <img
                  className={styles.iconFavorite}
                  src={icon_favorite}
                  alt="favorite"
                />
                Буду смотреть
              </button>
              <div className={styles.description_container}>
                <p className={styles.descriptionWord}>Описание</p>
                <p className={styles.description}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sequi doloribus eligendi quo deserunt id mollitia fugit,
                  corporis impedit ducimus minus veniam nobis natus rerum harum
                  commodi illo corrupti maiores voluptatem aperiam vitae omnis
                  dignissimos possimus porro aspernatur! Explicabo sit
                  repellendus dolores ratione quibusdam illo corporis illum
                  veritatis sunt quos, dicta accusantium distinctio quis maiores
                  necessitatibus numquam animi tenetur quam temporibus est nisi
                  nostrum eligendi. Quod, quidem nesciunt voluptas quo alias
                  sunt asperiores odio vero similique, tenetur eius ipsa culpa
                  enim in iusto veritatis eum. Ullam sequi quos a dicta saepe
                  odio illo fugit numquam fuga. Ipsum eos harum exercitationem
                  mollitia!
                </p>
              </div>
              <div className={styles.footer_card}>
                <div className={styles.count_vies_container}>
                  <img src={count_icon} className={styles.count_icon} alt="" />
                  <div className={styles.count}>{seminar.views}</div>
                </div>
                <div className={styles.author_container}>
                  <div>Автор семинара:</div>
                  <div className={styles.author}>{seminar.author}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.main_comment_container}>
          <div className={styles.comments_container}>
            <div className={styles.comments_word}>Комментарии</div>

            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.user_info}>
                  <img src={comment.url_photo} className={styles.user_image} />
                  <div className={styles.comment_username}>
                    {comment.username}
                  </div>
                  <div>
                    {/* Отрисовка количества звёзд в комментарии к семинару */}
                    {Array.from({ length: comment.rating }).map((_, index) => (
                      <img
                        key={index}
                        className={styles.comment_rate_icon}
                        src={rate_icon}
                        alt="rate_icon"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className={styles.comment_text}>{comment.comment_text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно БУДУ СМОТРЕТЬ */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div>
            <p>Семинар добавлен в&nbsp;</p>
            <p> <Link className={styles.modal_link} to='/yourSeminars'>Ваши семинары!</Link></p>
            </div>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeminarPage;


