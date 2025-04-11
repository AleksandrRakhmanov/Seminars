// import React, { useState } from 'react';
// import styles from './Seminars.module.css';
// import SeminarCard from './SeminarCard/SeminarCard';
// import DeleteModal from './DeleteModal/DeleteModal';
// import EditModal from './EditModal/EditModal';
// import search_icon from './icons/search_icon.png';
// import SignUpModal from './SignUpModal/SignUpModal';
// import useSeminars from '../../hooks/UseSeminars';

// const Seminars = () => {
//   const {
//     seminars,
//     isDeleteModalOpen,
//     seminarToDelete,
//     isEditModalOpen,
//     seminarToEdit,
//     isSignUpForSeminarOpen,
//     deleteSeminar,
//     cancelDelete,
//     confirmDelete,
//     editSeminar,
//     editFormChange,
//     saveEditedSeminar,
//     cancelEdit,
//     signUpForSeminar,
//     cansel_confirm_modal,
//   } = useSeminars();

//   const [search_seminar, setSearchSeminar] = useState('');

//   const handle_search_seminar = (event) => {
//     const seminar = event.target.value;
//     setSearchSeminar(seminar);
//   };

//   // Фильтрация семинаров в input
//   const filtered_seminars = seminars.filter(
//     (seminar) =>
//       seminar.title.toLowerCase().includes(search_seminar.toLowerCase()) ||
//       seminar.description.toLowerCase().includes(search_seminar.toLowerCase())
//   );

//   return (
//     <div>
//       <div className={styles.main_container}>
//         <div className={styles.search_input_container}>
//           <input
//             value={search_seminar}
//             onChange={handle_search_seminar}
//             className={styles.search_input}
//             placeholder="Введите семинар..."
//           />
//           <img
//             className={styles.search_icon}
//             src={search_icon}
//             alt="search_icon"
//           />
//         </div>
//         <div className={styles.seminars_contanter}>
//           {filtered_seminars.map((seminar) => (
//             <SeminarCard
//               key={seminar.id}
//               seminar={seminar}
//               onEdit={editSeminar}
//               onDelete={deleteSeminar}
//               onSignUp={signUpForSeminar}
//             />
//           ))}
//         </div>

//         {isSignUpForSeminarOpen && (
//           <SignUpModal onConfirm={cansel_confirm_modal} />
//         )}

//         {isDeleteModalOpen && (
//           <DeleteModal confirm={confirmDelete} cancel={cancelDelete} />
//         )}

//         {isEditModalOpen && seminarToEdit && (
//           <EditModal
//             seminar={seminarToEdit}
//             change={editFormChange}
//             save={saveEditedSeminar}
//             cancel={cancelEdit}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Seminars;


import React, { useState } from 'react';
import styles from './Seminars.module.css';
import SeminarCard from './SeminarCard/SeminarCard';
import DeleteModal from './DeleteModal/DeleteModal';
import EditModal from './EditModal/EditModal';
import search_icon from './icons/search_icon.png';
import SignUpModal from './SignUpModal/SignUpModal';
import useSeminars from '../../hooks/UseSeminars';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    isLoading // Добавьте это поле в ваш хук useSeminars
  } = useSeminars();

  const [search_seminar, setSearchSeminar] = useState('');

  const handle_search_seminar = (event) => {
    const seminar = event.target.value;
    setSearchSeminar(seminar);
  };

  // Фильтрация семинаров в input
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
            // Скелетон для карточек
            Array(6).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.seminar_card_skeleton}>
                <Skeleton width={285} height={120} style={{ marginTop: '60px' }} />
                <Skeleton width={285} height={310} />
                <Skeleton width={285} height={50}/>
              </div>
            ))
          ) : (            
            filtered_seminars.map((seminar) => (
              <SeminarCard
                key={seminar.id}
                seminar={seminar}
                onEdit={editSeminar}
                onDelete={deleteSeminar}
                onSignUp={signUpForSeminar}
              />
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