'use client';

import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import styles from '../../styles/seachBar.module.css';

//search bar component for the minecraft api

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const onChangeHandler = e => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClickHandler = async e => {
    onSearch(search);
    console.log(search);
  };

  return (
    <>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Buscar algo'
          />
          <div className={styles.searchIcon}>
            <MdOutlineSearch
              onClick={onClickHandler}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

