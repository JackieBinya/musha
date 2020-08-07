import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { Home } from '../pages/Home';
import { useProperties } from '../hooks';
import { properties } from '../fixtures';

jest.mock('../hooks');

afterEach(cleanup);

describe.skip('<Home>', () => {
  it('Try', async () => {
    useProperties = mockImplementation(() => Promise.resolve(properties));

    act((async) => {});
    const { findByPlaceholderText } = render(<Home />);

    screen.debug();
  });

  describe('<Hero/>', () => {
    it('Search', () => {
      const { queryByPlaceholderText } = render(<Home />);
      const searchInput = queryByPlaceholderText('Search by location');

      fireEvent.change(searchInput, { target: { value: 'test' } });

      expect(searchInput.value).toBe('test');
    });
  });
});
