import accounts from 'config/data/accounts';

const dbPrefix = 'piw';

const useStorage = name => {
  const storage =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  const createDb = db => {
    const objectStore = db.createObjectStore(`${dbPrefix}-${name}`, {
      keyPath: 'id',
      autoIncrement: true,
    });
    objectStore.transaction.oncomplete = event => {
      if (!accounts[name]) return;
      const objectStore = db
        .transaction(`${dbPrefix}-${name}`, 'readwrite')
        .objectStore(`${dbPrefix}-${name}`);
      accounts[name].forEach(account => {
        objectStore.add(account);
      });
    };
  };

  const loadAll = () => {
    return new Promise((resolve, reject) => {
      if (!storage)
        reject(
          Error(
            'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
          ),
        );
      const request = storage.open(`${dbPrefix}-${name}`, 1);
      request.onerror = event => {
        reject(Error('Błąd podczas otwierania indexed DB'));
      };
      request.onupgradeneeded = event => {
        createDb(event.target.result);
      };
      request.onsuccess = event => {
        const allRequest = event.target.result
          .transaction(`${dbPrefix}-${name}`)
          .objectStore(`${dbPrefix}-${name}`)
          .getAll();
        allRequest.onerror = event => {
          reject(Error('Błąd podczas wczytywania danych'));
        };
        allRequest.onsuccess = event => {
          resolve(event.target.result);
        };
      };
    });
  };

  const loadSingle = id => {
    return new Promise((resolve, reject) => {
      if (!storage)
        reject(
          Error(
            'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
          ),
        );
      const request = storage.open(`${dbPrefix}-${name}`, 1);
      request.onerror = event => {
        reject(Error('Błąd podczas otwierania indexed DB'));
      };
      request.onupgradeneeded = event => {
        createDb(event.target.rejesult);
      };
      request.onsuccess = event => {
        console.log('test');
        const singleRequest = event.target.result
          .transaction([`${dbPrefix}-${name}`], 'readwrite')
          .objectStore(`${dbPrefix}-${name}`)
          .get(id);
        singleRequest.onerror = event => {
          reject(Error('Obiekt nie istnieje'));
        };
        singleRequest.onsuccess = event => {
          resolve(event.target.result);
        };
      };
    });
  };

  const add = data => {
    return new Promise((resolve, reject) => {
      if (!storage)
        reject(
          Error(
            'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
          ),
        );
      const request = storage.open(`${dbPrefix}-${name}`, 1);
      request.onerror = event => {
        reject(Error('Błąd podczas otwierania indexed DB'));
      };
      request.onupgradeneeded = event => {
        createDb(event.target.rejesult);
      };
      request.onsuccess = event => {
        const addRequest = event.target.result
          .transaction([`${dbPrefix}-${name}`], 'readwrite')
          .objectStore(`${dbPrefix}-${name}`)
          .put(data);
        addRequest.onerror = event => {
          reject(Error('Błąd podczas dodawania'));
        };
        addRequest.onsuccess = event => {
          resolve(event.target.result);
        };
      };
    });
  };

  const update = (data, id) => {
    return new Promise((resolve, reject) => {
      if (!storage)
        reject(
          Error(
            'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
          ),
        );
      const request = storage.open(`${dbPrefix}-${name}`, 1);
      request.onerror = event => {
        reject(Error('Błąd podczas otwierania indexed DB'));
      };
      request.onupgradeneeded = event => {
        createDb(event.target.rejesult);
      };
      request.onsuccess = event => {
        const objectStore = event.target.result
          .transaction([`${dbPrefix}-${name}`], 'readwrite')
          .objectStore(`${dbPrefix}-${name}`);
        const singleRequest = objectStore.get(id);
        singleRequest.onerror = () => {
          reject(Error('Błąd podczas edycji'));
        };
        singleRequest.onsuccess = event => {
          resolve(event.target.result);
          const updateRequest = objectStore.put({ ...data, id });
          updateRequest.onerror = () => {
            reject(Error('Błąd podczas edycji'));
          };
          updateRequest.onsuccess = () => {
            resolve(true);
          };
        };
      };
    });
  };

  return { loadAll, loadSingle, add, update };
};

export default useStorage;
