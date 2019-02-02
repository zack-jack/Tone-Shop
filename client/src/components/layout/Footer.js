import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, List, Icon } from 'semantic-ui-react';

const lists = [
  {
    name: 'shop',
    header: 'Shop',
    links: [
      { name: 'All Guitars', linkTo: 'browse' },
      { name: 'Best Sellers', linkTo: 'browse' },
      { name: 'Newest Arrivals', linkTo: 'browse' },
      { name: 'Brands', linkTo: 'browse' }
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
      { name: 'Track an Order', linkTo: 'orders' },
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

const renderLists = lists =>
  lists.map(list => (
    <Grid.Column key={list.name} width={list.name === 'social' ? 7 : 3}>
      <div
        className={list.name === 'social' ? 'footer__social-container' : null}
      >
        <Header as="h4" content={list.header} />
        <List link className={list.name === 'social' ? 'footer__social' : null}>
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
              <List.Item key={link.name}>
                <Link to={`/${link.linkTo}`}>{link.name}</Link>
              </List.Item>
            )
          )}
        </List>
      </div>
    </Grid.Column>
  ));

const Footer = () => (
  <Container fluid className="footer">
    <Container fluid className="footer__nav">
      <Grid stackable>
        <Grid.Row>{renderLists(lists)}</Grid.Row>
      </Grid>
    </Container>

    <Container fluid className="footer__copyright">
      &copy; {new Date().getFullYear()} | Tone Shop
    </Container>
  </Container>
);

export default Footer;
