import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Grid,
  Image,
  Icon,
  Button,
  Divider,
  Table
} from 'semantic-ui-react';

class Product extends Component {
  state = {
    currentProduct: this.props.currentProduct
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ currentProduct: nextProps.currentProduct });
  }

  handleAddToCart = () => {};

  getBrandFromId = brandId => {
    return this.props.brands.filter(brand => brand._id === brandId)[0].name;
  };

  getBodyTypeFromId = bodyId => {
    return this.props.bodies.filter(body => body._id === bodyId)[0].name;
  };

  getWoodsFromId = woodId => {
    return this.props.woods.filter(wood => wood._id === woodId)[0];
  };

  getPickupsFromId = pickupsId => {
    return this.props.pickups.filter(pickup => pickup._id === pickupsId)[0];
  };

  render() {
    return (
      <Container>
        <Header as="h2">{this.state.currentProduct.name}</Header>
        <Header>{this.getBrandFromId(this.state.currentProduct.brand)}</Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src="" />
            </Grid.Column>
            <Grid.Column>
              <Header>${this.state.currentProduct.price.toFixed(2)}</Header>
              <p>{this.state.currentProduct.color}</p>
              {this.state.currentProduct.available ? (
                <div>
                  <Icon name="checkmark" color="green" />
                  <p>In Stock!</p>
                </div>
              ) : (
                <div>
                  <Icon name="x" color="red" />
                  <p>Currently Unavailable</p>
                </div>
              )}
              <Divider hidden />

              <Button onClick={this.handleAddToCart}>Add to Cart</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header>Description</Header>
            <p>{this.state.currentProduct.description}</p>
          </Grid.Row>
          <Grid.Row>
            <Header>Specs</Header>
            <Table celled fixed singleLine striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Body Type:</Table.Cell>
                  <Table.Cell>
                    {this.getBodyTypeFromId(this.state.currentProduct.body)}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Color:</Table.Cell>
                  <Table.Cell>{this.state.currentProduct.color}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Body Material:</Table.Cell>
                  <Table.Cell>
                    {this.getWoodsFromId(this.state.currentProduct.wood).body}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Neck Material:</Table.Cell>
                  <Table.Cell>
                    {this.getWoodsFromId(this.state.currentProduct.wood).neck}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Fretboard Material:</Table.Cell>
                  <Table.Cell>
                    {
                      this.getWoodsFromId(this.state.currentProduct.wood)
                        .fretboard
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Pickups:</Table.Cell>
                  <Table.Cell>
                    {
                      this.getPickupsFromId(this.state.currentProduct.pickups)
                        .type
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Number of Pickups:</Table.Cell>
                  <Table.Cell>
                    {
                      this.getPickupsFromId(this.state.currentProduct.pickups)
                        .number
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Number of Frets:</Table.Cell>
                  <Table.Cell>{this.state.currentProduct.frets}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentProduct: state.products.currentProduct,
    brands: state.products.brands,
    bodies: state.products.bodies,
    woods: state.products.woods,
    pickups: state.products.pickups
  };
};

export default connect(mapStateToProps)(Product);
