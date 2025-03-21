import { useState, useEffect } from 'react';

const useSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState(null);
  const [isSignUpForSeminarOpen, setSignUpSeminar] = useState(false);

  // Загрузка семинаров
  useEffect(() => {
    fetch('http://localhost:5005/seminars')
      .then((response) => response.json())
      .then((data) => {
        setSeminars(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке семинаров:', error);
      });
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
    if (!seminarToDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5005/seminars/${seminarToDelete}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Ошибка при удалении семинара: ${response.status} ${response.statusText} ${errorData}`
        );
      }

      setSeminars((prev) =>
        prev.filter((seminar) => seminar.id !== seminarToDelete)
      );

      console.log('Семинар успешно удалён');
    } catch (err) {
      console.error('Ошибка при удалении семинара:', err);
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
    setSeminarToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEditedSeminar = async () => {
    if (!seminarToEdit) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5005/seminars/${seminarToEdit.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(seminarToEdit),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setSeminars((prev) =>
        prev.map((seminar) =>
          seminar.id === seminarToEdit.id
            ? { ...seminar, ...data.updates }
            : seminar
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
