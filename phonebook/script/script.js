'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const addContactData = (contact) => {
    data.push(contact);
    console.log(data);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();

    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Тедефонный спавочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);

    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');

    const tr = `
    <tr>
    <th class="delete">Удалить</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>
    </tr>
    `;

    thead.insertAdjacentHTML('beforeend', tr);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overLay = document.createElement('div');
    overLay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    const formInner = `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name"
        id="name" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname"
        id="surname" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone"
        id="phone" type="number" required>
    </div>
    `;

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.insertAdjacentHTML('beforeend', formInner);

    form.append(...buttonGroup.btns);

    overLay.append(form);

    return {
      overLay,
      form,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footerContainer.textContent = `Все права защищены ©${title}`;

    footer.append(footerContainer);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const {form, overLay} = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);

    main.mainContainer.append(buttonGroup.btnWrapper, table, overLay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overLay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
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

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      const delColection = document.querySelectorAll('.delete');

      delColection.forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();
      }
    });
  };

  const addContactDataPage = (newContact, list) => {
    list.append(createRow(newContact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);

      addContactDataPage(newContact, list);
      addContactData(newContact);

      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const {list, logo, btnAdd, btnDel, formOverlay, form} = phoneBook;

    // Функционал
    const allRow = renderContacts(list, data);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    setTimeout(() => {
      const contact = createRow({
        name: 'Назар',
        surname: 'Урс',
        phone: '+79999999999',
      });
      list.append(contact);
    }, 2000);
  };

  window.phoneBookInit = init;
}
