import React, { useState } from 'react';
import axios from 'axios'
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
    console.log('Данные пользователя', formData);

    try {
      const response = await axios.post('http://localhost:5005/auth/registration', formData, {
        Headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Данные успешно отправлены', response.data);
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      
    }catch(err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
