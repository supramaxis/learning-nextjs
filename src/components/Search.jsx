'use client';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { getPokemons, getPokemonData } from './fetchApi';
import PokeInfo from './PokeAPI/PokeInfo';
import SearchResults from './SearchResults';
import styles from '../styles/seachBar.module.css';

// poke api https://pokeapi.co/api/v2/pokemon/

function Search() {
  const [pokeData, setPokeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [pokeDex, setPokeDex] = useState();
  const wrapperRef = useRef(null);

  const handleFilter = e => {
    setSearch(e.target.value);
    const newFilter = pokeData.filter(value => {
      return value.name.toLowerCase().includes(search.toLowerCase());
    });
    search === '' ? setFilteredData([]) : setFilteredData(newFilter);
    // const newFilteredData = pokeData.map(value => {
    //   return value.toLowerCase().includes(searchedWord.toLowerCase());
    // });
  };
  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  const handleClick = async e => {
    const data = await fetchApi(wordEntered);
    console.log(data); // this is the data from the api
  };

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async pokemon => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokeData(results);
    } catch (error) {
      console.log(error);
    }
  };

  const setPokeDexName = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            type='text'
            placeholder='Search for a Pokemon'
            value={search}
            onChange={handleFilter}
            onClick={() => setDisplay(!display)}
          />
          <div className={styles.searchIcon}>
            <MdOutlineSearch style={{ cursor: 'pointer' }} />
          </div>
        </div>
        {filteredData.length !== 0 && (
          <>
            <div className={styles.dataResult} ref={wrapperRef}>
              {filteredData.slice(0, 20).map((res, i) => {
                return (
                  <>
                    <SearchResults
                      key={i}
                      res={res}
                      setPokeDexName={setPokeDexName}
                      infoPokemon={poke => setPokeDex(poke)}
                    />
                  </>
                );
              })}
            </div>

            <div className='right-content'>
              <PokeInfo data={pokeDex} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;

