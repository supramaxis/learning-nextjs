function Joke({ joke }) {
  return (
    <>
      <div>
        <p className='category'>{joke.category} Joke</p>
      </div>
      <div className='main-container'>
        <p>"{joke.joke}"</p>
      </div>
    </>
  );
}

export default Joke;

