import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5005/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Данные успешно отправлены', response.data);

      // Очистка полей после успешной отправки
      setFormData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h2 className={styles.title}>Авторизация</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Войти
            </button>
          </form>
          <div className={styles.registerLink}>
            <p>
              Ещё нет аккаунта?{' '}
              <Link to="/registration" className={styles.link}>
                Регистрация
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;