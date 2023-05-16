/* const getStorage = (key) => {
  const contacts = JSON.parse(localStorage.getItem(key));

  if (contacts === null) {
    return [];
  }

  return contacts;
}; */

const getStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, obj) => {
  const contacts = getStorage(key);
  contacts.push(obj);
  localStorage.setItem(key, JSON.stringify(contacts));
};

const removeStorage = (num) => {
  const contacts = getStorage('contacts');
  contacts.forEach((item, i, arr) => {
    if (item.phone === num) {
      arr.splice(i, 1);
    }
  });
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
