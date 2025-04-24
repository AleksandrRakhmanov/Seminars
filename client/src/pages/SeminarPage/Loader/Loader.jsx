import React from 'react'
import styles from './Loader.module.scss'

const Loading = () => {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.seminarsContainer}>
            <div className={styles.loadingText}>
            Загрузка...
            </div>
        </div>
    </div>
  )
}

export default Loading;
