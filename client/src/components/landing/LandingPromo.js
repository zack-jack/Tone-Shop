import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const promo = {
  percentOff: '20%',
  endDate: 'February 28th, 2019'
};

const LandingPromo = () => {
  return (
    <div className="landing__promo">
      <Header as="h2">
        {`Save up to ${promo.percentOff} on qualifying products.`}
      </Header>
      <p>{`Now through ${promo.endDate}.`}</p>
      <Link to="/browse">
        <Button color="red">Shop Now</Button>
      </Link>
    </div>
  );
};

export default LandingPromo;
