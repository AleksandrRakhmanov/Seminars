import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import arrow_icon from './icons/arrow.png';
import icon_favorite from './icons/icon_favorite_light.png';
import count_icon from './icons/eye_icon.png';
import user_image from './icons/user_image.jpg';
import rate_icon from './icons/rate_icon.png';
import close_icon from './icons/close_icon.png'
import Loading from './Loader/Loader';
import CommentsCarousel from './CommentsCarousel';
import StarRating from './Star_rating/StarRating';
import styles from './SeminarPage.module.scss';

const SeminarPage = () => {
  const { id } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);

  const userComment = {
    username: '',
    rate: 0,
    comment: ''
  }

  const addSeminar = async (seminarId) => {
    setIsModalOpen(true);

    try {
      // Преобразуем seminarId в число
      const idAsNumber = Number(seminarId);

      if (isNaN(idAsNumber)) {
        throw new Error('seminarId должен быть числом');
      }

      console.log('Айдишник семинара' ,idAsNumber);

      const response = await axios.post('http://localhost:5005/addSeminar', {
        seminarId: idAsNumber,
      });

      console.log(response.data); 
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    setIsModalCommentOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalComment = () => {
    setIsModalCommentOpen(!isModalCommentOpen)
    console.log('Окно комментария открыто' , isModalCommentOpen);
  }

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
            <div onClick={openModalComment} className={styles.write_comment_container}>
              <button>Оставить отзыв</button>
            </div>

            <CommentsCarousel comments={comments} />
          </div>
        </div>
      </div>

      {/* Модальное окно БУДУ СМОТРЕТЬ */}
    <div className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ''}`}>
      <div className={styles.modal}>
        <div>
          <p>Семинар добавлен в&nbsp;</p>
          <p><Link className={styles.modal_link} to='/yourSeminars'>Ваши семинары!</Link></p>
        </div>
    <button onClick={closeModal}>Закрыть</button>
  </div>
</div>

      {/* Модальное окно ОСТАВИТЬ ОТЗЫВ */}
    <div className={`${styles.modalOverlayComments} ${isModalCommentOpen ? styles.active : ''}`}>
        <div className={styles.modalComments}>
          <p>Поделитесь своими впечатлениями о семинаре</p>
          <div onClick={openModalComment} className={styles.closeModalComments}>            
              <img src={close_icon}/>

          </div>

          <div className={styles.comment_username_container}>
          <input className={styles.comment_username} placeholder='Ваше имя...'></input>
          </div>
          <div className={styles.rate_icon_comment_container}>
      {/* Оценка семинара от пользователя */}
      <StarRating nitialRating={0} onRatingChange={(rating) => console.log('Selected rating:', rating)} />
          </div>
          <div className={styles.comment_text_input_container}>
            <textarea placeholder='Ваше сообщение...' className={styles.comment_text_input}></textarea>
          </div>
            <button onClick={addComment} className={styles.confirm_comment_btn} >Отправить отзыв</button>
   </div>

  </div>
    </div>
  );
};

export default SeminarPage;


