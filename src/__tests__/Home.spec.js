import React from 'react';
import { MemoryRouter, useRouteMatch } from 'react-router-dom';
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';
import { Home } from '../pages/Home';
import { useProperties } from '../hooks';
import Fuse from 'fuse.js';

jest.mock('../hooks', () => ({
  useProperties: jest.fn(),
}));

jest.mock('fuse.js', () => jest.fn(() => ({ search: jest.fn(() => []) })));

beforeEach(cleanup);

describe('<Home/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('If properties is equal to null the loader component is rendered', () => {
    useProperties.mockImplementation(() => ({ properties: null }));
    const { queryByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText('Loading...')).toBeTruthy();
  });

  it('If properties array is empty...', async () => {
    useProperties.mockImplementation(() => ({ properties: [] }));

    const { queryByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.queryByText('Ooops!!!No properties found.')).toBeTruthy();
  });
});

describe('<Home/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('If properties exist...', () => {
    useRouteMatch.mockReturnValue({ url: '/' });
    useProperties.mockImplementation(() => ({
      properties: [
        {
          title: 'Cozy room to rent',
          location: 'Gwabalanda',
          city: 'Bulawayo',
          description: 'Spacious room with plenty of storage',
          mobileNumber: '0786578900',
          availableTo: 'rent',
          imageUrls: ['https//:dummy-image.com'],
          numberOfBedrooms: '1',
          numberOfBathrooms: 'shared',
          id: '1',
        },
      ],
    }));

    const { queryByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(queryByText('Gwabalanda')).toBeTruthy();
    expect(queryByText('Residential sales and rentals for free!')).toBeTruthy();
  });

  it('Search is able to accept queries', () => {
    useRouteMatch.mockReturnValue({ url: '/' });
    useProperties.mockImplementation(() => ({
      properties: [
        {
          title: 'Cozy room to rent',
          location: 'Gwabalanda',
          city: 'Bulawayo',
          description: 'Spacious room with plenty of storage',
          mobileNumber: '0786578900',
          availableTo: 'rent',
          imageUrls: ['https//:dummy-image.com'],
          numberOfBedrooms: '1',
          numberOfBathrooms: 'shared',
          id: '1',
        },
      ],
    }));

    const { queryByText, queryByPlaceholderText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.queryByPlaceholderText('Search by location');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(screen.queryByText('Ooops!!!No properties found.')).toBeTruthy();
  });
});
