import Pagination from './Pagination';
import Pokemon from './Pokemon';
import styles from '../../styles/poke.module.css';

export default function Pokedex({ pokemons, page, setPage, total, loading }) {
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total - 1);
    setPage(nextPage);
  };

  const firstPage = () => {
    const firstPage = Math.min(0);
    setPage(firstPage);
  };

  // if (loading) {
  //   return (
  //     <h1 className="main-container" style={{ userSelect: "none" }}>
  //       Loading...
  //     </h1>
  //   );
  // } else {
  return (
    <>
      <div>
        <Pagination
          key={page}
          page={page + 1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
          onFirstPage={firstPage}
        />
      </div>
      <div id='poke-container' className={styles.pokeContainer}>
        {pokemons.map((pokemon, i) => {
          return (
            <>
              <div key={i}>
                <Pokemon pokemon={pokemon} key={pokemon.name} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  // }
}

