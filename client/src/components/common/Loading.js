import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => {
  return (
    <Dimmer active inverted>
      <Loader size="huge" content="Loading..." />
    </Dimmer>
  );
};

export default Loading;
