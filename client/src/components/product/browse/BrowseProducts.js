import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Divider } from 'semantic-ui-react';

import {
  getAllProducts,
  getBrands,
  getBodyTypes,
  getWoodTypes,
  getPickupTypes,
  getBestSellers,
  getNewArrivals,
  setSearchResults
} from '../../../actions/products';

import Filters from './Filters';
import ProductsGrid from './ProductsGrid';
import PaginationMenu from './PaginationMenu';

class BrowseProducts extends Component {
  state = {
    allProducts: this.props.products.allProducts,
    bestSellers: this.props.products.bestSellers,
    newArrivals: this.props.products.newArrivals,
    brands: this.props.products.brands,
    bodies: this.props.products.bodies,
    woods: this.props.products.woods,
    pickups: this.props.products.pickups,
    itemsPerPage: 9,
    currentPage: 1,
    initialGrid: [],
    productsGrid: [],
    checked: [],
    filteredProducts: undefined,
    searchResults: this.props.searchResults
  };

  componentDidMount() {
    // Get products, brands, body types, woods, and pickups from db and dispatch to redux
    this.fetchProductInfo();

    // URL contains brand ID to filter by
    if (window.location.href.includes('brand')) {
      const brandId = window.location.href.match(/\/([^/]+)\/?$/)[1];
      const checked = this.state.brands.filter(brand => brand._id === brandId);
      const key = checked[0].name;
      const addToCheckedState = { [key]: true };

      this.setState({ checked: this.state.checked.concat(addToCheckedState) });
    }

    // Check if redirected with a search query
    if (
      window.location.href.includes('results') &&
      this.state.searchResults.length > 0
    ) {
      // this.updateFilteredProducts();
      this.updateDisplayGrid();
    }

    // Set initial grid of products to display
    this.setInitialGrid();
  }

  componentDidUpdate(prevProps) {
    // If filters are applied, updated the filtered products
    if (
      this.state.filteredProducts === undefined ||
      this.state.filteredProducts.length !== 0
    ) {
      this.updateFilteredProducts();
    }

    // Listen for browser url changes
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // Wait for state to be updated from redux then update display grid
      setTimeout(() => {
        this.updateDisplayGrid();
      }, 10);
    }

    // If there are filters applied
    if (this.state.filteredProducts) {
      // Wait for filtered products state to update then update display grid
      setTimeout(() => {
        this.updateDisplayGrid();
      }, 100);
    }

    // Clear search results when filters are applied
    if (
      this.state.searchResults.length > 0 &&
      ((this.state.checked && this.state.checked.length > 0) ||
        (this.state.filteredProducts && this.state.filteredProducts.length > 0))
    ) {
      this.setState({ searchResults: [] });

      this.props.setSearchResults([]);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allProducts: nextProps.products.allProducts,
      bestSellers: nextProps.products.bestSellers,
      newArrivals: nextProps.products.newArrivals,
      brands: nextProps.products.brands,
      bodies: nextProps.products.bodies,
      woods: nextProps.products.woods,
      pickups: nextProps.products.pickups
    });

    if (
      this.state.bestSellers.map(product => product._id).join(',') !==
      nextProps.products.bestSellers.map(product => product._id).join(',')
    ) {
      this.updateDisplayGrid();
    }

    if (
      this.state.newArrivals.map(product => product._id).join(',') !==
      nextProps.products.newArrivals.map(product => product._id).join(',')
    ) {
      this.updateDisplayGrid();
    }
  }

  fetchProductInfo = () => {
    if (
      window.location.href.includes('new') ||
      window.location.href.includes('bestsellers')
    ) {
      this.props.getNewArrivals(4);
      this.props.getBestSellers(15);
    }

    this.props.getAllProducts();
    this.props.getBrands();
    this.props.getBodyTypes();
    this.props.getWoodTypes();
    this.props.getPickupTypes();
  };

  setInitialGrid = () => {
    // Define indices to split
    const startIndex =
      this.state.currentPage === 1
        ? 0
        : (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex =
      this.state.currentPage === 1
        ? this.state.currentPage * this.state.itemsPerPage
        : this.state.currentPage * this.state.itemsPerPage;

    if (window.location.href.includes('new')) {
      this.setState({
        productsGrid: this.state.newArrivals.slice(startIndex, endIndex),
        initialGrid: this.state.newArrivals.slice(startIndex, endIndex)
      });
    } else if (window.location.href.includes('bestsellers')) {
      this.setState({
        productsGrid: this.state.bestSellers.slice(startIndex, endIndex),
        initialGrid: this.state.bestSellers.slice(startIndex, endIndex)
      });
    } else if (
      window.location.href.includes('results') &&
      this.state.searchResults.length > 0
    ) {
      this.setState({
        productsGrid: this.state.searchResults.slice(startIndex, endIndex),
        initialGrid: this.state.searchResults.slice(startIndex, endIndex)
      });
    } else {
      // Split products into initial items to display
      const productsGrid = this.state.allProducts.slice(startIndex, endIndex);

      this.setState({ productsGrid });
      this.setState({ initialGrid: productsGrid });
    }
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

    window.scrollTo(0, 0);

    // Split the group of products by number of items to display per page
    // If there are filters applied, use filtered products
    if (window.location.href.includes('new')) {
      this.setState({
        productsGrid: this.state.newArrivals.slice(startIndex, endIndex)
      });
    } else if (window.location.href.includes('bestsellers')) {
      this.setState({
        productsGrid: this.state.bestSellers.slice(startIndex, endIndex)
      });
    } else if (
      window.location.href.includes('results') &&
      this.state.searchResults.length > 0
    ) {
      this.setState({
        productsGrid: this.state.searchResults.slice(startIndex, endIndex)
      });
    } else if (
      this.state.filteredProducts &&
      this.state.filteredProducts.length > 0
    ) {
      this.setState({
        productsGrid: this.state.filteredProducts.slice(startIndex, endIndex)
      });
    } else {
      // Otherwise use all products
      this.setState({
        productsGrid: this.state.allProducts.slice(startIndex, endIndex)
      });
    }
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

    const filteredByPrice = filterBy.prices;

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

  updateFilteredProducts = () => {
    const newFilteredProducts = this.filterProducts(this.state.allProducts);

    if (newFilteredProducts && newFilteredProducts.length === 0) {
      this.setState({ filteredProducts: [] });
    } else {
      // Normalize the arrays of objects to strings of product ids for comparison
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
  };

  updateDisplayGrid = () => {
    // Define indices to split
    const startIndex =
      this.state.currentPage === 1
        ? 0
        : (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex =
      this.state.currentPage === 1
        ? this.state.currentPage * this.state.itemsPerPage
        : this.state.currentPage * this.state.itemsPerPage;

    // Route includes new. Show new arrivals.
    if (
      window.location.href.includes('new') &&
      (!this.state.filteredProducts || this.state.filteredProducts.length === 0)
    ) {
      this.setState({
        productsGrid: this.state.newArrivals.slice(startIndex, endIndex)
      });
    }

    // Route includes bestsellers. Show best sellers.
    if (
      window.location.href.includes('bestsellers') &&
      (!this.state.filteredProducts || this.state.filteredProducts.length === 0)
    ) {
      this.setState({
        productsGrid: this.state.bestSellers.slice(startIndex, endIndex)
      });
    }

    // Route includes search results
    if (
      window.location.href.includes('results') &&
      this.state.searchResults.length > 0 &&
      (!this.state.filteredProducts || this.state.filteredProducts.length === 0)
    ) {
      this.setState({
        productsGrid: this.state.searchResults.slice(startIndex, endIndex)
      });
    }

    // There are filters applied in state, so show filtered products
    if (this.state.filteredProducts && this.state.filteredProducts.length > 0) {
      const newFilteredProducts = this.filterProducts(this.state.allProducts);

      // Normalize the arrays of objects to strings of product ids for comparison
      const newFilterMap =
        newFilteredProducts &&
        newFilteredProducts.length > 0 &&
        newFilteredProducts.map(product => product._id).join(',');

      const newProductsGrid = this.state.allProducts.slice(
        startIndex,
        endIndex
      );

      const newProductsGridMap =
        newProductsGrid &&
        newProductsGrid.length > 0 &&
        newProductsGrid.map(product => product._id).join(',');

      if (
        newFilteredProducts === undefined &&
        this.state.productsGrid.map(product => product._id).join(',') !==
          newProductsGridMap
      ) {
        this.setState({
          productsGrid: newProductsGrid
        });
      } else if (
        // Check that the displayed products grid items differ from the filtered products list
        this.state.productsGrid.map(product => product._id).join(',') !==
          newFilterMap &&
        this.state.filteredProducts &&
        this.state.filteredProducts.length > 0
      ) {
        const filteredGrid = this.state.filteredProducts.slice(
          startIndex,
          endIndex
        );

        // Update state grid to display with the filtered items only
        this.setState({
          filteredProducts: newFilteredProducts,
          productsGrid: filteredGrid
        });
      }

      if (
        this.state.productsGrid.map(product => product._id).join(',') !==
          newFilterMap &&
        this.state.filteredProducts &&
        this.state.filteredProducts.length === 0
      ) {
        const resetGrid = newFilteredProducts.slice(startIndex, endIndex);

        this.setState({
          filteredProducts: newFilteredProducts,
          productsGrid: resetGrid
        });
      }
    }

    // There are no adders to the url and there are no filters applied, so show all products
    if (
      this.props.location.pathname === '/browse' &&
      (this.state.filteredProducts === undefined ||
        this.state.filteredProducts.length === 0)
    ) {
      this.setState({
        productsGrid: this.state.allProducts.slice(startIndex, endIndex)
      });
    }
  };

  getNumItems = () => {
    if (
      this.state.checked &&
      this.state.checked.some(item => Object.values(item)[0]) &&
      this.state.productsGrid &&
      this.state.productsGrid.length === 0
    ) {
      return 0;
    } else if (
      this.state.checked &&
      this.state.checked.length > 0 &&
      this.state.checked.some(item => Object.values(item)[0]) &&
      this.state.filteredProducts &&
      this.state.filteredProducts.length > 0
    ) {
      return this.state.filteredProducts.length;
    } else {
      if (window.location.href.includes('new')) {
        return this.state.newArrivals.length;
      } else if (window.location.href.includes('bestsellers')) {
        return this.state.bestSellers.length;
      } else if (
        window.location.href.includes('results') &&
        this.state.searchResults.length > 0
      ) {
        return this.state.searchResults.length;
      } else {
        return this.state.allProducts.length;
      }
    }
  };

  render() {
    return (
      <Container fluid className="browse">
        <Header as="h5">Browse Products</Header>
        <Grid columns={2} stackable>
          <Grid.Column
            tablet={6}
            computer={4}
            largeScreen={3}
            widescreen={3}
            className="filters__container"
          >
            <p>Filter by:</p>
            <Filters handleChecked={this.handleChecked} />
          </Grid.Column>

          <Grid.Column
            tablet={9}
            computer={11}
            largeScreen={11}
            widescreen={11}
          >
            <ProductsGrid products={this.state.productsGrid} />
            <Divider hidden />
            <PaginationMenu
              numItems={this.getNumItems()}
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
    products: state.products,
    searchResults: state.products.searchResults
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      getAllProducts,
      getBrands,
      getBodyTypes,
      getWoodTypes,
      getPickupTypes,
      getBestSellers,
      getNewArrivals,
      setSearchResults
    }
  ),
  withRouter
)(BrowseProducts);
