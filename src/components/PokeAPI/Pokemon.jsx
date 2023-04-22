import styles from '../../styles/poke.module.css';

export default function Pokemon({ pokemon, id }) {
  const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  };

  const main_types = Object.keys(colors);

  const type = main_types.find(type => pokemon.types[0].type.name === type);

  const color = colors[type];

  return (
    <div className={styles.pokemon} style={{ backgroundColor: color }}>
      <div className={styles.imgContainer}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className={styles.info}>
        <span className={styles.number}>#{pokemon.id}</span>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <small className={styles.type}>
          Type: <span>{pokemon.types[0].type.name}</span>
        </small>
      </div>
    </div>
  );
}

