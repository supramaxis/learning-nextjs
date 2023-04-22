export default function PokeInfo({ data }) {
  return (
    <>
      {!data ? (
        ''
      ) : (
        <div>
          <h2>Name: {data.name}</h2>
          <img src={data.sprites.front_default} />
        </div>
      )}
    </>
  );
}

