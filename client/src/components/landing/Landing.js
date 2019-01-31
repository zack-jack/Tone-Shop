import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { getBestSellers, getNewArrivals } from '../../actions/products';

import LandingSlider from './LandingSlider';
import LandingPromo from './LandingPromo';
import LandingBenefits from './LandingBenefits';
import BestSellers from '../product/BestSellers';
import NewArrivals from '../product/NewArrivals';
import LandingBanner from './LandingBanner';

class Landing extends Component {
  state = {
    products: this.props.products
  };

  componentDidMount() {
    // Fetch top 3 best selling products
    this.props.getBestSellers(3);

    // Fetch top 3 newest items
    this.props.getNewArrivals(3);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  render() {
    return (
      <>
        <LandingSlider />
        <LandingPromo />
        <LandingBenefits />
        <Container fluid className="landing__featured">
          <BestSellers products={this.state.products} />
          <NewArrivals products={this.state.products} />
        </Container>
        <LandingBanner />
      </>
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
  { getBestSellers, getNewArrivals }
)(Landing);
