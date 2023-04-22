export default function Card({ pokemon, infoPokemon }) {
  return (
    <div className='dataResult'>
      {pokemon.map((poke, i) => {
        return (
          <>
            <div key={poke.name} onClick={() => infoPokemon(poke)}>
              <div>
                <a className='dataItem'>
                  <p>{poke.id}</p>
                  <p>{poke.name}</p>
                  <img src={poke.sprites.front_default} alt={poke.name} />
                </a>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

