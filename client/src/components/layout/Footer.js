import React from 'react';
import { Container, Grid, Header, List, Icon } from 'semantic-ui-react';

const lists = [
  {
    name: 'shop',
    header: 'Shop',
    links: ['All Guitars', 'Best Sellers', 'Newest Arrivals', 'Brands']
  },
  {
    name: 'explore',
    header: 'Explore',
    links: ['About Us', 'Contact Info', 'FAQ']
  },
  {
    name: 'account',
    header: 'Account',
    links: ['My Account', 'Track an Order', 'Returns']
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
    <Grid.Column width={list.name === 'social' ? 7 : 3}>
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
              <Icon name={link.icon} size="large" />
            </List.Item>
          ) : (
            <List.Item key={link} as="a">
              {link}
            </List.Item>
          )
        )}
      </List>
    </Grid.Column>
  ));

const Footer = () => (
  <>
    <Container>
      <Grid stackable>
        <Grid.Row>{renderLists(lists)}</Grid.Row>
      </Grid>
    </Container>

    <Container className="footer__copyright">
      &copy; {new Date().getFullYear()} | Tone Shop
    </Container>
  </>
);

export default Footer;
