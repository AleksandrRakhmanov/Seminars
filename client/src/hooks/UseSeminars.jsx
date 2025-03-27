import { useState, useEffect } from 'react';
import axios from 'axios';

const useSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState(null);
  const [isSignUpForSeminarOpen, setSignUpSeminar] = useState(false);

  // Загрузка семинаров
  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const response = await axios.get('http://localhost:5005/seminars');
        setSeminars(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке семинаров:', error);
      }
    };

    loadSeminars();
  }, []);

  // Удаление семинара
  const deleteSeminar = (id) => {
    setSeminarToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSeminarToDelete(null);
  };

  const confirmDelete = async () => {
    if (!seminarToDelete) return;

    try {
      await axios.delete(`http://localhost:5005/seminars/${seminarToDelete}`);
      setSeminars(prev => prev.filter(seminar => seminar.id !== seminarToDelete));
      console.log('Семинар успешно удалён');
    } catch (error) {
      console.error('Ошибка при удалении семинара:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setSeminarToDelete(null);
    }
  };

  // Редактирование семинара
  const editSeminar = (seminar) => {
    setSeminarToEdit(seminar);
    setIsEditModalOpen(true);
  };

  const editFormChange = (e) => {
    const { name, value } = e.target;
    setSeminarToEdit(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEditedSeminar = async () => {
    if (!seminarToEdit) return;

    try {
      const response = await axios.patch(
        `http://localhost:5005/seminars/${seminarToEdit.id}`,
        seminarToEdit
      );

      setSeminars(prev =>
        prev.map(seminar =>
          seminar.id === seminarToEdit.id ? { ...seminar, ...response.data.updates } : seminar
        )
      );

      setIsEditModalOpen(false);
      console.log('модальное окно закрыто');
    } catch (error) {
      console.error('Ошибка при сохранении семинара:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setSeminarToEdit(null);
  };

  // Запись на семинар
  const signUpForSeminar = () => {
    setSignUpSeminar(true);
  };

  const cansel_confirm_modal = () => {
    setSignUpSeminar(false);
  };

  // Возвращаем состояния и функции
  return {
    seminars,
    isDeleteModalOpen,
    seminarToDelete,
    isEditModalOpen,
    seminarToEdit,
    isSignUpForSeminarOpen,

    deleteSeminar,
    cancelDelete,
    confirmDelete,
    editSeminar,
    editFormChange,
    saveEditedSeminar,
    cancelEdit,
    signUpForSeminar,
    cansel_confirm_modal,
  };
};

export default useSeminars;