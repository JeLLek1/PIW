import { useState, useEffect } from 'react';
import useStorage from 'utils/useStorage';

const defaultFilterOptions = {
  name: '',
  description: '',
  tags: [],
};

export const useTab = storageName => {
  const [data, setData] = useState({});
  const [dataFiltered, setDataFiltered] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    ...defaultFilterOptions,
  });

  const [isLoading, setIsLoading] = useState(true);
  const { loadAll } = useStorage(storageName);

  const changeFilterOptions = (name, value) => {
    setFilterOptions(oldState => {
      oldState[name] = value;
      return { ...oldState };
    });
  };

  useEffect(() => {
    const filter = key => {
      return (
        data[key].name
          .toLowerCase()
          .includes(filterOptions.name.toLowerCase()) &&
        data[key].description
          .toLowerCase()
          .replace('\n', ' ')
          .includes(filterOptions.description.toLowerCase()) &&
        (filterOptions.tags.length === 0 ||
          data[key].tags.some(el =>
            filterOptions.tags.some(filterEl => filterEl.key === el.key),
          ))
      );
    };

    const filtered = Object.keys(data)
      .filter(filter)
      .reduce((res, key) => {
        res[key] = data[key];
        return res;
      }, {});
    setDataFiltered(filtered);
  }, [data, filterOptions]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await loadAll();
        setData(data);
      } catch (e) {
        console.log(e);
        alert(e);
      }
      setIsLoading(false);
    };
    load();
  }, [loadAll]);

  return { dataFiltered, filterOptions, isLoading, changeFilterOptions };
};
