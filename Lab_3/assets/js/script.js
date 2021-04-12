'use strict';

function useModal({ title, content }) {
  const modal = $('#modal');
  modal.find('.modal-title').html(title);
  modal.find('.modal-body').html(content);
  modal.fadeIn(200);
  return new Promise((resolve, reject) => {
    const accept = e => {
      if (!$(e.target).is('#modal-accept')) return;
      resolve(true);
      modal.fadeOut(200);
      removeEvents();
    };
    const cancel = e => {
      if (!$(e.target).is(modal) && !$(e.target).is('#modal-cancel')) return;
      resolve(false);
      modal.fadeOut(200);
      removeEvents();
    };
    modal.on('click', accept);
    modal.on('click', cancel);
    const removeEvents = () => {
      modal.off('click', accept);
      modal.off('click', cancel);
    };
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

class ToDoLists {
  pattern = /\{\$(.+?)\}/g;
  constructor(props, defaultLists = []) {
    this.nextID = 0;
    this.lists = {};
    this.container = document.querySelector(props.container);
    this.trashCan = {
      type: 'none',
      item: 0,
      list: 0,
      data: {},
    };
    this.itemForm = {
      addItemButton: document.querySelector(props.addItemButton),
      itemTitleInput: document.querySelector(props.itemTitleInput),
      itemListSelect: document.querySelector(props.itemListSeleect),
    };

    this.templates = {
      list: document
        .querySelector('script[data-name="lists-list"]')
        .textContent.split(this.pattern),
      item: document
        .querySelector('script[data-name="lists-item"]')
        .textContent.split(this.pattern),
      addList: document
        .querySelector('script[data-name="list-add"]')
        .textContent.split(this.pattern),
    };

    this.initLists(defaultLists);
    this.itemForm.addItemButton.onclick = () => this.submitItemForm();
    document.addEventListener('click', e => this.handleItemDone(e));
    /** jQuery part */
    $(document).on('click', '.list__element-detele', e =>
      this.deleteElement(e),
    );
    $(document).on('click', '.list__item-detele', e => this.deleteItem(e));
    $(document).keydown(e => this.handleCtrlZ(e));
    /** End jQuery part */
    document.addEventListener('click', e => this.handleListHide(e));
    document.addEventListener('change', e => this.handleCaseChange(e));
    document.addEventListener('change', e => this.handleSearchChange(e));
    document.addEventListener('keyup', e => this.handleSearchChange(e));
    document.addEventListener('keydown', e => this.handleSearchChange(e));
    document.addEventListener('click', e => this.handleAddList(e));
  }

  initLists(lists) {
    this.lists = {};
    lists.forEach(el => {
      const id = this.addList(el.title);
      el.items.forEach(item => {
        this.addItem(id, item);
      });
    });
    this.render();
  }
  handleAddList(e) {
    if (e.target.id !== 'list__add-list-btn') return;
    const input = document.querySelector('#list__add-list-input');
    if (input.value === '') {
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
      this.addList(escapeHtml(input.value));
      this.render();
    }
  }
  runSearch(index) {
    const caseSensitive = this.lists[index].caseSensitive;
    const searchString = caseSensitive
      ? this.lists[index].search
      : this.lists[index].search.toLowerCase();

    document.querySelectorAll(`.list__item--${index}`).forEach(el => {
      const content = escapeHtml(
        caseSensitive ? el.dataset.content : el.dataset.content.toLowerCase(),
      );
      if (!caseSensitive) content.toLowerCase();
      if (content.indexOf(searchString) !== 0) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
    });
  }
  handleSearchChange(e) {
    if (!e.target.classList.contains('list__search')) return;
    const index = e.target.dataset.element;
    this.lists[index].search = escapeHtml(e.target.value);
    this.runSearch(index);
  }
  handleCaseChange(e) {
    if (!e.target.classList.contains('list__case-sensitive-input')) return;
    const index = e.target.dataset.element;
    this.lists[index].caseSensitive = e.target.checked;
    this.runSearch(index);
  }
  handleListHide(e) {
    if (
      e.target.classList.contains('card-header--hide') ||
      (e.target.parentNode.classList.contains('card-header--hide') &&
        !e.target.classList.contains('list__element-detele'))
    ) {
      const target = e.target.closest('.list__element');
      if (!target) return;
      const elementID = target.dataset.element;
      if (this.lists[elementID].hide) {
        this.lists[elementID].hide = false;
        target.classList.remove('hide');
      } else {
        this.lists[elementID].hide = true;
        target.classList.add('hide');
      }
    }
  }
  handleCtrlZ(e) {
    if (e.which !== 90 || !e.ctrlKey || this.trashCan.type === 'none') return;

    switch (this.trashCan.type) {
      case 'element':
        this.lists[this.trashCan.list] = { ...this.trashCan.data };
        break;
      case 'item':
        this.lists[this.trashCan.list].items[this.trashCan.item] = {
          ...this.trashCan.data,
        };
        break;
    }
    this.trashCan.type = 'none';
    this.render();
  }
  deleteElement(e) {
    useModal({
      title: 'Uwaga',
      content: 'Czy na pewno chcesz usunąć tą listę?',
    }).then(isAccepted => {
      if (!isAccepted) return;
      const targetData = $(e.target).data('delete');
      this.trashCan.type = 'element';
      this.trashCan.list = targetData;
      this.trashCan.data = { ...this.lists[targetData] };
      delete this.lists[targetData];
      this.render();
    });
  }
  deleteItem(e) {
    useModal({
      title: 'Uwaga',
      content: 'Czy na pewno chcesz usunąć ten element listy?',
    }).then(isAccepted => {
      if (!isAccepted) return;
      const targetData = $(e.target).data('delete').split('/');
      this.trashCan.type = 'item';
      this.trashCan.list = targetData[0];
      this.trashCan.item = targetData[1];
      this.trashCan.data = {
        ...this.lists[targetData[0]].items[targetData[1]],
      };
      delete this.lists[targetData[0]].items[targetData[1]];
      this.render();
    });
  }

  submitItemForm() {
    const text = this.itemForm.itemTitleInput.value;
    const list = this.itemForm.itemListSelect.value;
    let invalid = false;
    if (text === '') {
      this.itemForm.itemTitleInput.classList.add('is-invalid');
      invalid = true;
    } else {
      this.itemForm.itemTitleInput.classList.remove('is-invalid');
    }

    if (this.lists[list] === undefined) {
      this.itemForm.itemListSelect.classList.add('is-invalid');
      invalid = true;
    } else {
      this.itemForm.itemListSelect.classList.remove('is-invalid');
    }

    if (invalid) return;
    this.itemForm.itemTitleInput.value = '';
    this.addItem(list, text);
    this.render();
  }

  handleItemDone(e) {
    let target = '';
    if (e.target.classList.contains('list__item')) {
      target = e.target;
    } else if (
      !e.target.classList.contains('list__item-detele') &&
      e.target.parentNode.classList?.contains('list__item')
    ) {
      target = e.target.parentNode;
    } else {
      return;
    }

    const pos = target.dataset.item.split('/');

    if (target.classList.contains('list__item--closed')) {
      target.classList.remove('list__item--closed');
      this.lists[pos[0]].items[pos[1]].isClosed = false;
    } else {
      target.classList.add('list__item--closed');
      this.lists[pos[0]].items[pos[1]].isClosed = true;
      const dateFormated = this.getCurrentDateFormated();
      this.lists[pos[0]].items[pos[1]].closeDate = dateFormated;
      target.querySelector('.list__item-date').innerHTML = dateFormated;
    }
  }

  getCurrentDateFormated() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${dd}/${mm}/${yyyy}`;
  }

  addList(title) {
    this.lists[this.nextID] = {
      id: this.nextID,
      title: title,
      caseSensitive: false,
      nextID: 0,
      search: '',
      items: {},
    };
    return this.nextID++;
  }

  addItem(id, text) {
    const idItem = this.lists[id].nextID++;
    this.lists[id].items[idItem] = {
      id: idItem,
      content: escapeHtml(text),
      isClosed: false,
      closeDate: '',
      hide: false,
    };
    return idItem;
  }

  passProps(props) {
    return function (tok, i) {
      return i % 2 ? props[tok] : tok;
    };
  }

  removeOptions() {
    const length = this.itemForm.itemListSelect.options.length;
    for (let i = length - 1; i >= 0; i--) {
      this.itemForm.itemListSelect.remove(i);
    }
  }

  addOption(text, value) {
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    this.itemForm.itemListSelect.add(option);
  }

  render() {
    this.container.innerHTML = '';
    this.removeOptions();
    this.addOption('Wybierz listę', -1);
    for (const listIndex in this.lists) {
      const list = this.lists[listIndex];
      let items = '';
      for (const itemIndex in list.items) {
        items += this.templates.item
          .map(
            this.passProps({
              ID: list.items[itemIndex].id,
              parentID: list.id,
              content: list.items[itemIndex].content,
              class: list.items[itemIndex].isClosed ? 'list__item--closed' : '',
              closeDate: list.items[itemIndex].closeDate,
            }),
          )
          .join('');
      }
      if (items === '') {
        items = '<li class="list-group-item list__empty">Lista jest pusta</li>';
      }
      this.container.innerHTML += this.templates.list
        .map(
          this.passProps({
            ID: list.id,
            title: list.title,
            content: items,
            class: list.hide ? 'hide' : '',
            caseAttr: list.caseSensitive ? 'checked' : '',
            search: list.search,
          }),
        )
        .join('');
      this.runSearch(list.id);
      this.addOption(list.title, list.id);
    }
    this.container.innerHTML += this.templates.addList
      .map(this.passProps({}))
      .join('');
  }
}

(function () {
  new ToDoLists(
    {
      container: '#lists',
      addItemButton: '#button-add-item',
      itemTitleInput: '#input-item',
      itemListSeleect: '#select-input-list',
    },
    [
      {
        title: 'Pilne',
        items: ['Przykładowy wpis'],
      },
      {
        title: 'Mało pilne',
        items: [],
      },
    ],
  );
})();
