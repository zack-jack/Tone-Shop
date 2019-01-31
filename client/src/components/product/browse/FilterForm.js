import React from 'react';
import { Form } from 'semantic-ui-react';

const FilterForm = props => (
  <Form>
    <Form.Group grouped>
      {props.options.map(option => (
        <Form.Checkbox
          key={option}
          label={option}
          name={option}
          value={option}
          onChange={props.handleChecked}
        />
      ))}
    </Form.Group>
  </Form>
);

export default FilterForm;
