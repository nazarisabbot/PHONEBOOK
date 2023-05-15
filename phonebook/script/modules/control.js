import {addContactDataPage} from './render.js';
import serviceLocalStorage from './serviceLocalStorage.js';

const {setStorage, removeStorage} = serviceLocalStorage;

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target === formOverlay ||
      target.classList.contains('close')
    ) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    const delColection = document.querySelectorAll('.delete');

    delColection.forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    if (e.target.closest('.del-icon')) {
      e.target.closest('.contact').remove();
      const parent = e.target.closest('.contact');
      const num = parent.children[3].textContent;
      removeStorage(num);
    }
  });
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    setStorage('contacts', newContact);

    addContactDataPage(newContact, list);

    form.reset();
    closeModal();
  });
};
