import React, { useState, useEffect, Suspense } from 'react';
import styles from './YourSeminars.module.css';
import Modal from './Modal/Modal';
import DeleteModal from '../Seminars/DeleteModal/DeleteModal';
import EditModal from '../Seminars/EditModal/EditModal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

const YourSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState(null);
  const [editedSeminar, setEditedSeminar] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    photo: ''
  });

  const onEdit = (id) => {
    const seminar = seminars.find(s => s.id === id);
    setSeminarToEdit(seminar);
    setEditedSeminar({
      title: seminar.title,
      description: seminar.description,
      date: seminar.date,
      time: seminar.time,
      photo: seminar.photo
    });
    setIsEditModalOpen(true);
  };

  const editFormChange = (e) => {
    const { name, value } = e.target;
    setEditedSeminar(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEditedSeminar = async () => {
    try {
      await axios.patch(`http://localhost:5005/seminars/${seminarToEdit.id}`, editedSeminar);
      
      const updatedSeminars = seminars.map(seminar => 
        seminar.id === seminarToEdit.id ? { ...seminar, ...editedSeminar } : seminar
      );
      setSeminars(updatedSeminars);
      
      setIsEditModalOpen(false);
      setSeminarToEdit(null);
    } catch (err) {
      console.error('Ошибка при обновлении семинара:', err);
    }
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setSeminarToEdit(null);
  };

  const onDelete = async (id) => {
    try {
      setIsDeleteModalOpen(true);
      setSeminarToDelete(id);
    } catch (error) {
      console.error('Ошибка при подготовке к удалению:', error);
    }
  };
  
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/seminars/yourSeminars/${seminarToDelete}`);
      
      setSeminars(prev => prev.filter(seminar => seminar.id !== seminarToDelete));
      setIsDeleteModalOpen(false);
      setSeminarToDelete(null);
    } catch (error) {
      console.error('Ошибка при удалении семинара:', error);
      setIsDeleteModalOpen(false);
    }
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSeminarToDelete(null);
  };

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const response = await axios.get('http://localhost:5005/getYourSeminars');
        setSeminars(response.data);
      } catch(err) {
        console.error(err);
      }
    };
    fetchSeminar();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.seminars_contanter}>
        {seminars.length ? (
          seminars.map((seminar) => (
            <Suspense key={`suspense-${seminar.id}`}>
              <div className={styles.seminar_card} key={seminar.id}>
                <Link to={`/seminars/${seminar.id}`} className={styles.description_card}>
                  <div>
                    <h2 className={styles.seminar_title}>{seminar.title}</h2>
                    <p className={styles.seminar_description}>{seminar.description}</p>
                    <p className={styles.seminar_dateAndTime}>
                      {seminar.date} в {seminar.time}
                    </p>
                    <img
                      className={styles.photo_card}
                      src={seminar.photo}
                      alt={seminar.title}
                    />
                  </div>
                </Link>

                <div className={styles.icons}>
                  <button
                    className={styles.edit_btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(seminar.id);
                    }}
                  ></button>
                  <button
                    className={styles.delete_btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(seminar.id);
                    }}
                  ></button>
                </div>
              </div>
            </Suspense>
          ))
        ) : (
          <Modal/>
        )}

        {isDeleteModalOpen && (
          <DeleteModal confirm={confirmDelete} cancel={cancelDelete}/>
        )}
        
        {isEditModalOpen && seminarToEdit && (
          <EditModal
            seminar={editedSeminar}
            change={editFormChange}
            save={saveEditedSeminar}
            cancel={cancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default YourSeminars;