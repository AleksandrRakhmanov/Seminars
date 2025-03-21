import React from 'react';
import styles from './SignUpModal.module.css';
const SignUpModal = ({ onConfirm }) => {
  return (
    <div className={styles.modal_window}>
      <div className={styles.modal}>
        <h2 className={styles.successful_message}>
          Вы успешно записались на семинар!
        </h2>
        <button className={styles.confirm_sign_up_btn} onClick={onConfirm}>
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
