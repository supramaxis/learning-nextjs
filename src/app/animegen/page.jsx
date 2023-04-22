'use client';

import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import AnimeSearch from '../../components/AnimeSearch';
import { getAnimeData } from '../../components/fetchApi';

function AnimeGif() {
  const [gif, setGif] = useState([]);
  const [show, setShow] = useState(false);

  async function fetchGif() {
    const data = await fetch('https://api.waifu.pics/sfw/kiss');
    const res = await data.json();
    setGif(res);
  }

  useEffect(() => {
    fetchGif();
  }, []);

  const onSearch = async anm => {
    if (!anm) {
      return fetchGif();
    }
    setNotFound(false);
    const result = await getAnimeData(anm);
    if (!result) {
      setNotFound(true);
      return;
    } else {
      setGif(result);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1 className='main-container'>Random Anime Gifs</h1>
      <AnimeSearch onSearch={onSearch} />

      <Button
        className='flex justify-center items-center mt-4'
        style={{ backgroundColor: '#0a58ca' }}
        variant='primary'
        onClick={handleShow}>
        See Categories
      </Button>

      <Modal size='md' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet,
          blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill,
          happy, wink, poke, dance
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={handleClose}
            style={{ backgroundColor: '#0a58ca' }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <>
        <div className='image-container'>
          <img src={gif.url} alt={gif.url} />
        </div>
        <div className='button-container'>
          <button onClick={() => fetchGif()}>See a new gif</button>
        </div>
      </>
    </>
  );
}

export default AnimeGif;

