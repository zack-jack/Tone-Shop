import React from 'react';
import { Header } from 'semantic-ui-react';

const LandingPromo = () => {
  return (
    <div className="landing__banner">
      <Header as="h2"># NewGearDay</Header>
      <p>
        Share your new gear photos on social media with the hashtag #NewGearDay
        and we will feature you here on our website!
      </p>
    </div>
  );
};

export default LandingPromo;
