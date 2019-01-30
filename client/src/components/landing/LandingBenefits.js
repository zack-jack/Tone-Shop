import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

const benefits = [
  {
    name: 'shipping',
    content: 'Fast Free Shipping',
    icon: 'shipping fast'
  },
  {
    name: 'warranty',
    content: 'Free 2 Year Warranty',
    icon: 'handshake outline'
  },
  {
    name: 'price',
    content: 'Lowest Price Guaranteed',
    icon: 'money bill alternate outline'
  }
];

const LandingBenefits = () => (
  <Grid centered columns={3} padded>
    {benefits.map(benefit => (
      <Grid.Column key={benefit.name} textAlign="center" width={3}>
        <Icon circular color="grey" name={benefit.icon} size="big" />
        <span className="landing__benefits-text">{benefit.content}</span>
      </Grid.Column>
    ))}
  </Grid>
);

export default LandingBenefits;
