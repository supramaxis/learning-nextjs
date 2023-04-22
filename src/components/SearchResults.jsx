import { dataItem } from '../styles/seachBar.module.css';

export default function SearchResults({
  setPokeDexName,
  res,
  i,
  pokeDexName,
  pokemon,
  infoPokemon
}) {
  return (
    <div onClick={() => setPokeDexName(res.name)} tabIndex={0}>
      <a className={dataItem}>
        <p>
          {res.name}
          <img src={res.sprites.front_default} alt={res.name} />
        </p>
      </a>
    </div>
  );
}

