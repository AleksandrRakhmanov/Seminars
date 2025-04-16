import React, { useState, Suspense } from 'react';
import styles from './Seminars.module.css';
import DeleteModal from './DeleteModal/DeleteModal';
import EditModal from './EditModal/EditModal';
import search_icon from './icons/search_icon.png';
import SignUpModal from './SignUpModal/SignUpModal';
import useSeminars from '../../hooks/UseSeminars';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Ленивая загрузка SeminarCard
const SeminarCard = React.lazy(() => import('./SeminarCard/SeminarCard'));

const Seminars = () => {
  const {
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
    isLoading
  } = useSeminars();

  const [search_seminar, setSearchSeminar] = useState('');

  const handle_search_seminar = (event) => {
    const seminar = event.target.value;
    setSearchSeminar(seminar);
  };

  const filtered_seminars = seminars.filter(
    (seminar) =>
      seminar.title.toLowerCase().includes(search_seminar.toLowerCase()) ||
      seminar.description.toLowerCase().includes(search_seminar.toLowerCase())
  );

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.search_input_container}>
          <input
            value={search_seminar}
            onChange={handle_search_seminar}
            className={styles.search_input}
            placeholder="Введите семинар..."
          />
          <img
            className={styles.search_icon}
            src={search_icon}
            alt="search_icon"
          />
        </div>
        
        <div className={styles.seminars_contanter}>
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.seminar_card_skeleton}>
                <Skeleton width={285} height={120} style={{ marginTop: '60px' }} />
                <Skeleton width={285} height={310} />
                <Skeleton width={285} height={50}/>
              </div>
            ))
          ) : (            
            filtered_seminars.map((seminar) => (
              <Suspense 
                key={`suspense-${seminar.id}`}
                fallback={
                  <div>
                    <Skeleton width={285} height={120} style={{ marginTop: '60px' }} />
                    <Skeleton width={285} height={310} />
                    <Skeleton width={285} height={50}/>
                  </div>
                }
              >
                <SeminarCard
                  seminar={seminar}
                  onEdit={editSeminar}
                  onDelete={deleteSeminar}
                  onSignUp={signUpForSeminar}
                />
              </Suspense>
            ))
          )}
        </div>

        {isSignUpForSeminarOpen && (
          <SignUpModal onConfirm={cansel_confirm_modal} />
        )}

        {isDeleteModalOpen && (
          <DeleteModal confirm={confirmDelete} cancel={cancelDelete} />
        )}

        {isEditModalOpen && seminarToEdit && (
          <EditModal
            seminar={seminarToEdit}
            change={editFormChange}
            save={saveEditedSeminar}
            cancel={cancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Seminars;