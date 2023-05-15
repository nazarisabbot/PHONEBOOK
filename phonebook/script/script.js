import serviceLocalStorage from './modules/serviceLocalStorage.js';
import hoverRow from './modules/hoverEfects.js';
import {
  modalControl,
  deleteControl,
  formControl,
} from './modules/control.js';

import {
  renderPhoneBook as render,
  renderContacts,
} from './modules/render.js';

const {getStorage} = serviceLocalStorage;

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const phoneBook = render(app, title);

  const {list, logo, btnAdd, btnDel, formOverlay, form} = phoneBook;

  // Функционал
  const conatacts = getStorage('contacts');
  const allRow = renderContacts(list, conatacts);

  const {closeModal} = modalControl(btnAdd, formOverlay);

  hoverRow(allRow, logo);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal);
};

window.phoneBookInit = init;
