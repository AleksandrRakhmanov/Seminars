import { useState, useEffect } from 'react';
import axios from 'axios';

const useSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState(null);
  const [isSignUpForSeminarOpen, setSignUpSeminar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5005/seminars');
        setSeminars(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке семинаров:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSeminars();
  }, []);

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
      setIsLoading(true);
      await axios.delete(`http://localhost:5005/seminars/${seminarToDelete}`);
      setSeminars(prev => prev.filter(seminar => seminar.id !== seminarToDelete));
    } catch (error) {
      console.error('Ошибка при удалении семинара:', error);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setSeminarToDelete(null);
    }
  };

  const editSeminar = (seminar) => {
    setSeminarToEdit({...seminar});
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
      setIsLoading(true);
      await axios.patch(
        `http://localhost:5005/seminars/${seminarToEdit.id}`,
        seminarToEdit
      );

      setSeminars(prev =>
        prev.map(seminar =>
          seminar.id === seminarToEdit.id ? seminarToEdit : seminar
        )
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Ошибка при сохранении семинара:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setSeminarToEdit(null);
  };

  const signUpForSeminar = () => {
    setSignUpSeminar(true);
  };

  const cansel_confirm_modal = () => {
    setSignUpSeminar(false);
  };

  return {
    seminars,
    isDeleteModalOpen,
    seminarToDelete,
    isEditModalOpen,
    seminarToEdit,
    isSignUpForSeminarOpen,
    isLoading,

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