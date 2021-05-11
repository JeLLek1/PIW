import accounts from 'config/data/accounts';
import { useCallback } from 'react';

const dbPrefix = 'piw';

const useStorage = name => {
  const storage =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  const createDb = useCallback(event => {
    const db = event.target.result;

    Object.keys(accounts).forEach(dbName => {
      db.createObjectStore(`${dbPrefix}-${dbName}`, {
        keyPath: 'id',
        autoIncrement: true,
      });
    });
    event.target.transaction.oncomplete = event => {
      Object.keys(accounts).forEach(dbName => {
        const objectStore = db
          .transaction(`${dbPrefix}-${dbName}`, 'readwrite')
          .objectStore(`${dbPrefix}-${dbName}`);
        accounts[dbName].forEach(account => {
          objectStore.add(account);
        });
      });
    };
  }, []);

  const loadAll = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!storage)
        reject(
          Error(
            'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
          ),
        );
      const request = storage.open(`${dbPrefix}-data`, 1);
      request.onerror = event => {
        reject(Error('Błąd podczas otwierania indexed DB'));
      };
      request.onupgradeneeded = event => {
        createDb(event);
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
  }, [createDb, name, storage]);

  const loadSingle = useCallback(
    id => {
      return new Promise((resolve, reject) => {
        if (!storage)
          reject(
            Error(
              'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
            ),
          );
        const request = storage.open(`${dbPrefix}-data`, 1);
        request.onerror = event => {
          reject(Error('Błąd podczas otwierania indexed DB'));
        };
        request.onupgradeneeded = event => {
          createDb(event);
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
    },
    [createDb, name, storage],
  );

  const add = useCallback(
    data => {
      return new Promise((resolve, reject) => {
        if (!storage)
          reject(
            Error(
              'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
            ),
          );
        const request = storage.open(`${dbPrefix}-data`, 1);
        request.onerror = event => {
          reject(Error('Błąd podczas otwierania indexed DB'));
        };
        request.onupgradeneeded = event => {
          createDb(event);
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
    },
    [createDb, name, storage],
  );

  const update = useCallback(
    (data, id) => {
      return new Promise((resolve, reject) => {
        if (!storage)
          reject(
            Error(
              'Dla poprawnego działania aplikacji wymagane jest IndexedDB api',
            ),
          );
        const request = storage.open(`${dbPrefix}-data`, 1);
        request.onerror = event => {
          reject(Error('Błąd podczas otwierania indexed DB'));
        };
        request.onupgradeneeded = event => {
          createDb(event);
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
    },
    [createDb, name, storage],
  );

  return { loadAll, loadSingle, add, update };
};

export default useStorage;
