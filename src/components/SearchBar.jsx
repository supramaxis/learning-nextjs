'use client';

import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import styles from '../styles/searchBar.module.css';

//search bar component for the poke api

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState();

  const onChangeHandler = e => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClickHandler = async e => {
    onSearch(search);
  };

  return (
    <>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            type='text'
            onChange={onChangeHandler}
            placeholder='Buscar pokemon'
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

