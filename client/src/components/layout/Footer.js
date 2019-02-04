import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Header, List, Icon } from 'semantic-ui-react';

import {
  getAllProducts,
  getBestSellers,
  getNewArrivals
} from '../../actions/products';

const lists = [
  {
    name: 'shop',
    header: 'Shop',
    links: [
      { name: 'All Guitars', linkTo: 'browse' },
      { name: 'Best Sellers', linkTo: 'browse/bestsellers' },
      { name: 'Newest Arrivals', linkTo: 'browse/new' }
    ]
  },
  {
    name: 'explore',
    header: 'Explore',
    links: [
      { name: 'About Us', linkTo: 'about' },
      { name: 'Contact Info', linkTo: 'contact' },
      { name: 'FAQ', linkTo: 'faq' }
    ]
  },
  {
    name: 'account',
    header: 'Account',
    links: [
      { name: 'My Account', linkTo: 'account' },
      { name: 'Orders', linkTo: 'orders' },
      { name: 'Returns', linkTo: 'returns' }
    ]
  },
  {
    name: 'social',
    header: 'Connect with us',
    links: [
      {
        name: 'facebook',
        icon: 'facebook f',
        linkTo: '//facebook.com'
      },
      {
        name: 'twitter',
        icon: 'twitter',
        linkTo: '//twitter.com'
      },
      {
        name: 'instagram',
        icon: 'instagram',
        linkTo: '//instagram.com'
      },
      {
        name: 'youtube',
        icon: 'youtube',
        linkTo: '//youtube.com'
      }
    ]
  }
];

class Footer extends Component {
  handleLinkClick = e => {
    const href = e.target.href.match(/^(https?:\/\/[^/]*\/)(.*)/)[2];

    if (href.includes('new')) {
      this.props.getNewArrivals(4);
    } else if (href.includes('bestsellers')) {
      this.props.getBestSellers(15);
    } else {
      this.props.getAllProducts();
    }
  };

  renderLists = lists =>
    lists.map(list => (
      <Grid.Column key={list.name} width={list.name === 'social' ? 7 : 3}>
        <div
          className={list.name === 'social' ? 'footer__social-container' : null}
        >
          <Header as="h4" content={list.header} />
          <List
            link
            className={list.name === 'social' ? 'footer__social' : null}
          >
            {list.links.map(link =>
              list.name === 'social' ? (
                <List.Item
                  key={link.name}
                  as="a"
                  href={link.linkTo}
                  target="_blank"
                  className="footer__social-link"
                >
                  <Icon name={link.icon} size="big" />
                </List.Item>
              ) : (
                <List.Item
                  key={link.name}
                  as={Link}
                  to={`/${link.linkTo}`}
                  onClick={this.handleLinkClick}
                >
                  {link.name}
                </List.Item>
              )
            )}
          </List>
        </div>
      </Grid.Column>
    ));

  render() {
    return (
      <Container fluid className="footer">
        <Container fluid className="footer__nav">
          <Grid stackable>
            <Grid.Row>{this.renderLists(lists)}</Grid.Row>
          </Grid>
        </Container>

        <Container fluid className="footer__copyright">
          &copy; {new Date().getFullYear()} | Tone Shop
        </Container>
      </Container>
    );
  }
}

export default compose(
  connect(
    null,
    { getAllProducts, getNewArrivals, getBestSellers }
  ),
  withRouter
)(Footer);
