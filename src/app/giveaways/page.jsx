'use client';

import { useState, useEffect } from 'react';
import { getGiveaways } from '../../components/fetchApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import GvwCards from '../../components/GvwCards';
import { Col, Container, Row } from 'react-bootstrap';

export default function Giveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const fetchGiveaways = async () => {
    try {
      const data = await getGiveaways();
      setGiveaways(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGiveaways();
  }, []);

  return (
    <>
      <h1 className='main-container'>Giveaways</h1>
      <Container className='w-70'>
        <Row className='gy-3'>
          {giveaways.map(gvw => (
            <Col md={4} xs={6} key={gvw.id}>
              <GvwCards gvw={gvw} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

