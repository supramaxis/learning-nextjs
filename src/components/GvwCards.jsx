import { Card } from 'react-bootstrap';

export default function GvwCards({ gvw }) {
  return (
    <>
      <Card className='mb-3 mt-20 h-100'>
        <Card.Img variant='top' src={gvw.image} />
        <Card.Body>
          <Card.Title>{gvw.title}</Card.Title>
          <Card.Text>{gvw.description}</Card.Text>
          <Card.Text>{gvw.instructions}</Card.Text>
          <Card.Text>Type: {gvw.type}</Card.Text>
        </Card.Body>
        <Card.Body className='d-flex flex-column'>
          <a
            className='btn btn-primary mt-auto'
            href={gvw.open_giveaway_url}
            target='_blank'>
            View
          </a>
        </Card.Body>
      </Card>
    </>
  );
}

