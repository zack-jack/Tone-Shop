import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Divider } from 'semantic-ui-react';

import {
  getAllProducts,
  getBrands,
  getBodyTypes,
  getWoodTypes,
  getPickupTypes,
  getBestSellers,
  getNewArrivals
} from '../../../actions/products';

import Filters from './Filters';
import ProductsGrid from './ProductsGrid';
import PaginationMenu from './PaginationMenu';

class BrowseProducts extends Component {
  state = {
    allProducts: this.props.products.allProducts,
    brands: this.props.products.brands,
    bodies: this.props.products.bodies,
    woods: this.props.products.woods,
    pickups: this.props.products.pickups,
    itemsPerPage: 9,
    currentPage: 1,
    productsGrid: [],
    checked: [],
    filteredProducts: []
  };

  componentDidMount() {
    // Get products, brands, body types, woods, and pickups from db and dispatch to redux
    this.fetchProductInfo();

    // Split products into initial items to display
    const productsGrid = this.state.allProducts.slice(
      0,
      this.state.itemsPerPage
    );

    this.setState({ productsGrid });
  }

  componentDidUpdate() {
    const newFilteredProducts = this.filterProducts(this.state.allProducts);

    // Normalize the arrays of objects to strings for comparison
    const stateFilterMap =
      this.state.filteredProducts &&
      this.state.filteredProducts.length > 0 &&
      this.state.filteredProducts.map(product => product._id).join(',');

    const newFilterMap =
      newFilteredProducts &&
      newFilteredProducts.length > 0 &&
      newFilteredProducts.map(product => product._id).join(',');

    // Check if state is lagging the checked filters
    if (stateFilterMap !== newFilterMap) {
      // Update state if necessary
      this.setState({
        filteredProducts: newFilteredProducts
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allProducts: nextProps.products.allProducts,
      brands: nextProps.products.brands,
      bodies: nextProps.products.bodies,
      woods: nextProps.products.woods,
      pickups: nextProps.products.pickups
    });
  }

  fetchProductInfo = () => {
    this.props.getAllProducts();
    this.props.getBrands();
    this.props.getBodyTypes();
    this.props.getWoodTypes();
    this.props.getPickupTypes();
  };

  handlePageChange = targetPageNum => {
    this.setState({ currentPage: targetPageNum });

    // Define indices to split
    const startIndex =
      targetPageNum === 1 ? 0 : (targetPageNum - 1) * this.state.itemsPerPage;
    const endIndex =
      targetPageNum === 1
        ? targetPageNum * this.state.itemsPerPage
        : targetPageNum * this.state.itemsPerPage;

    // Split the group of products by number of items to display per page
    const productsGrid = this.state.allProducts.slice(startIndex, endIndex);

    // Set state with new grouped array
    this.setState({ productsGrid });
  };

  handleChecked = e => {
    const changed = e.target.innerText;

    const exists =
      this.state.checked &&
      this.state.checked.some(checked => {
        return Object.keys(checked)[0] === changed;
      });

    if (exists) {
      const indexOfExisting = this.state.checked.findIndex(checked => {
        return Object.keys(checked)[0] === changed;
      });
      const keyToChange = Object.keys(this.state.checked[indexOfExisting])[0];
      const currentSetValue = Object.values(
        this.state.checked[indexOfExisting]
      )[0];
      let newChecked;

      // If the current value of the checked object is set to 'true'
      if (currentSetValue === true) {
        // Loop through checked and change this key to false
        newChecked = this.state.checked.map(checked => {
          if (Object.keys(checked)[0] === keyToChange) {
            return { [keyToChange]: false };
          } else {
            return checked;
          }
        });
      } else {
        // Current state is false, so set it to true
        newChecked = this.state.checked.map(checked => {
          if (Object.keys(checked)[0] === keyToChange) {
            return { [keyToChange]: true };
          } else {
            return checked;
          }
        });
      }

      // Update the existing key with the toggled value for the checkbox that was checked
      this.setState({ checked: newChecked });
    } else {
      // Update checked state with newly checked filter
      this.setState({
        checked: this.state.checked.concat({ [changed]: true })
      });
    }
  };

  filterProducts = products => {
    const filters = this.state.checked.filter(criteria =>
      // Check if the checked obj is true aka currently checked
      Object.values(criteria)[0] ? criteria : null
    );

    // Match checked criteria keys against db IDs
    const bodyFilters = this.state.bodies.filter(body => {
      return filters.some(filter => {
        const bodyNormalized = body.name.toString().toLowerCase();
        const filterNormalized = Object.keys(filter)[0]
          .toString()
          .toLowerCase();

        return bodyNormalized === filterNormalized ? body : false;
      });
    });

    const pickupFilters = this.state.pickups.filter(pickup => {
      return filters.some(filter => {
        const pickupNormalized = pickup.type.toString().toLowerCase();
        const filterNormalized = Object.keys(filter)[0]
          .toString()
          .toLowerCase();

        return pickupNormalized === filterNormalized ? pickup : false;
      });
    });

    const brandFilters = this.state.brands.filter(brand => {
      return filters.some(filter => {
        const brandNormalized = brand.name.toString().toLowerCase();
        const filterNormalized = Object.keys(filter)[0]
          .toString()
          .toLowerCase();

        return brandNormalized === filterNormalized ? brand : false;
      });
    });

    const priceFilters = this.state.allProducts.filter(product => {
      return filters.some(filter => {
        const priceNormalized = product.price.toString().toLowerCase();
        const filterNormalized = Object.keys(filter)[0]
          .toString()
          .toLowerCase()
          .replace(/[^0-9-]/g, '')
          .split('-');

        return priceNormalized >= filterNormalized[0] &&
          priceNormalized <= filterNormalized[1]
          ? product
          : false;
      });
    });

    // Set up filters object for product comparison
    const filterBy = {
      body: bodyFilters,
      pickups: pickupFilters,
      brands: brandFilters,
      prices: priceFilters
    };

    // Return products that meet filter conditions
    const filteredByBody = products.filter(product =>
      filterBy.body.some(bodyFilter => bodyFilter._id === product.body)
    );

    const filteredByPickups = products.filter(product =>
      filterBy.pickups.some(
        pickupFilter => pickupFilter._id === product.pickups
      )
    );

    const filteredByBrand = products.filter(product =>
      filterBy.brands.some(brandFilter => brandFilter._id === product.brand)
    );

    const filteredByPrice = products.filter(product => {
      filterBy.prices.some(price => {
        return price.__id === product.__id;
      });
    });

    const filtered = [
      filteredByBody,
      filteredByPickups,
      filteredByBrand,
      filteredByPrice
    ];

    // If a filter option is empty, remove it
    const nonEmptyFiltered = filtered.filter(filterArr => {
      if (filterArr.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    // Check all filters and only return the products that match all filters
    const filteredProducts =
      nonEmptyFiltered.length > 1
        ? nonEmptyFiltered.reduce((prev, current) =>
            prev.filter(element => current.includes(element))
          )
        : nonEmptyFiltered[0];

    return filteredProducts;
  };

  render() {
    return (
      <Container fluid className="browse">
        <Header as="h5">Browse Products</Header>
        <Grid columns={2}>
          <Grid.Column width={4} className="filters__container">
            <p>Filter by:</p>
            <Filters handleChecked={this.handleChecked} />
          </Grid.Column>

          <Grid.Column>
            <ProductsGrid products={this.state.productsGrid} />
            <Divider hidden />
            <PaginationMenu
              numItems={this.state.allProducts.length}
              itemsPerPage={this.state.itemsPerPage}
              handlePageChange={this.handlePageChange}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  {
    getAllProducts,
    getBrands,
    getBodyTypes,
    getWoodTypes,
    getPickupTypes,
    getBestSellers,
    getNewArrivals
  }
)(BrowseProducts);
