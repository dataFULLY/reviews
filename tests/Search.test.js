import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Search from '../client/src/components/Search.jsx';

describe('Search component', () => {
  it('renders successfully', () => {
    shallow(<Search />);
  });
});
