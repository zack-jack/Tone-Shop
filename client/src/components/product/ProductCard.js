import React from 'react';
import { Card, Image, Header, Button } from 'semantic-ui-react';

const ProductCard = props => (
  <Card>
    <Image src={props.product.images[0]} />
    <Card.Content textAlign="center">
      <Card.Header>{props.product.name}</Card.Header>
      <Card.Meta>{props.product.brand.name}</Card.Meta>
      <Header>{`$ ${props.product.price.toFixed(2)}`}</Header>

      <Button color="red">Add to Cart</Button>
      <Button basic color="red">
        View Item
      </Button>
    </Card.Content>
  </Card>
);

export default ProductCard;
