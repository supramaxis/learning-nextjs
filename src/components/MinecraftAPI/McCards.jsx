import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MCcards({ mc }) {
  return (
    <>
      <Card className='mb-3 mt-20 h-100'>
        {/* <Card.Img variant="top" src={mc.image} /> */}
        <Card.Body>
          <Card.Title>{mc.name}</Card.Title>
          <Card.Text>Minecraft ID Name: {mc.minecraft_id_name}</Card.Text>
          <Card.Text>Category: {mc.category}</Card.Text>
          <Card.Text>Is Stackable? {mc.stackable}</Card.Text>
          <Card.Text>Max Stack Size: {mc.max_stack_size}</Card.Text>
          {mc.durability ? (
            <Card.Text>Durability: {mc.durability}</Card.Text>
          ) : null}
          {mc.armor_points ? (
            <Card.Text>Armor: {mc.armor_points}</Card.Text>
          ) : null}
          {mc.armor_toughness ? (
            <Card.Text>Armor Toughness: {mc.armor_toughness}</Card.Text>
          ) : null}
          {mc.knockback_resistance ? (
            <Card.Text>
              Knockback Resistance: {mc.knockback_resistance}
            </Card.Text>
          ) : null}
          {mc.attack_damage ? (
            <Card.Text>Attack Damage: {mc.attack_damage}</Card.Text>
          ) : null}
          {mc.attack_speed ? (
            <Card.Text>Attack Speed: {mc.attack_speed}</Card.Text>
          ) : null}
          {mc.hunger_points ? (
            <Card.Text>Hunger Points: {mc.hunger_points}</Card.Text>
          ) : null}
          {mc.quality ? <Card.Text>Quality: {mc.quality}</Card.Text> : null}
        </Card.Body>
      </Card>
    </>
  );
}

