import React from 'react';
import { MemoryRouter, useRouteMatch } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { PropertyIcons } from '../components/PropertyIcons';

beforeEach(cleanup);

describe('<PropertyIcons/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    useRouteMatch.mockReturnValue({ url: '/my-properties' });

    const { queryByText } = render(
      <MemoryRouter>
        <PropertyIcons
          id="1"
          location="Magwegwe"
          numberOfBathrooms="shared"
          numberOfBedrooms="2"
        />
      </MemoryRouter>
    );

    //  expect(screen.queryByText('Are you show you want to delete?')).toBeTruthy();
    screen.debug();
  });
});
