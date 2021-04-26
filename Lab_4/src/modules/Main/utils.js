import { useState, useRef, useEffect } from 'react';
import * as data from 'config/data';

const defaultFilterOptions = {
  name: '',
  description: '',
  tags: [],
};

export const useMain = () => {
  const [accounts, setAccounts] = useState({ ...data.accounts });
  const [accountsFiltered, setAccountsFiltered] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    ...defaultFilterOptions,
  });
  const nextKey = useRef(Math.max(...Object.keys(data.accounts)) + 1);

  const changeFilterOptions = (name, value) => {
    setFilterOptions(oldState => {
      oldState[name] = value;
      return { ...oldState };
    });
  };

  const addAccount = ({ name, email, description, tags, image }) => {
    setAccounts(oldState => {
      oldState[nextKey.current] = {
        name: name,
        description: description,
        email: email,
        tags: [...tags],
        image: image,
      };
      nextKey.current++;
      return { ...oldState };
    }, []);
  };

  useEffect(() => {
    const filter = key => {
      return (
        accounts[key].name
          .toLowerCase()
          .includes(filterOptions.name.toLowerCase()) &&
        accounts[key].description
          .toLowerCase()
          .replace('\n', ' ')
          .includes(filterOptions.description.toLowerCase()) &&
        (filterOptions.tags.length === 0 ||
          accounts[key].tags.some(el =>
            filterOptions.tags.some(filterEl => filterEl.key === el.key),
          )) // OR
      );
    };

    const filtered = Object.keys(accounts)
      .filter(filter)
      .reduce((res, key) => {
        res[key] = accounts[key];
        return res;
      }, {});
    setAccountsFiltered(filtered);
  }, [accounts, filterOptions]);

  return { accountsFiltered, addAccount, filterOptions, changeFilterOptions };
};
