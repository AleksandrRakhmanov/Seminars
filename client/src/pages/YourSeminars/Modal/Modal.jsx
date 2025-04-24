import React from 'react'
import styles from './Modal.module.scss'
import { Link } from 'react-router-dom';

const Modal = () => {
  return (
    <div className={styles.main_container}>
      <p className={styles.message}>Вы пока не добавили семинары</p>
      <Link to="/seminars" className={styles.seminars_btn}>Перейти к семинарам</Link>
    </div>
  )
}

export default Modal
