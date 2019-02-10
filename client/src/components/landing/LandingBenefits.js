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
  <Grid centered columns={3} stackable className="landing__benefits">
    {benefits.map(benefit => (
      <Grid.Column
        key={benefit.name}
        textAlign="center"
        computer={5}
        largeScreen={4}
        widescreen={4}
        className="landing__benefit"
      >
        <Icon circular color="grey" name={benefit.icon} size="big" />
        <span className="landing__benefits-text">{benefit.content}</span>
      </Grid.Column>
    ))}
  </Grid>
);

export default LandingBenefits;
