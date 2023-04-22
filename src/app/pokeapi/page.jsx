'use client';

import { useEffect, useState } from 'react';
import {
  getPokemons,
  getPokemonData,
  fetchApi
} from '../../components/fetchApi';
import Pokedex from '../../components/PokeAPI/Pokedex';
import SearchBar from '../../components/SearchBar';

export default function PokedexIndex() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(20, 20 * page);
      const promises = data.results.map(async pokemon => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 20));
      setNotFound(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const onSearch = async pokemon => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await fetchApi(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {notFound ? (
        <h1 className='main-container'>Pokemon not found</h1>
      ) : (
        <Pokedex
          key={page}
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          total={total}
        />
      )}
    </>
  );
}

