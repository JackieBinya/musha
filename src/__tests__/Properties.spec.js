import React from 'react';
import { firebase } from '../firebase';
import { usePropertiesByUserID } from '../hooks';
import { useRouteMatch, useParams } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { Properties } from '../pages/Properties';

import { toHaveClass } from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveClass });

jest.mock('react', () => {
  const ActualReact = require.requireActual('react');
  return {
    ...ActualReact,
    useContext: (data) => ({
      currentUser: {
        uid: '123456',
        email: 'foo@bar.com',
      },
    }),
  };
});

jest.mock('../hooks', () => ({
  usePropertiesByUserID: jest.fn(),
}));

describe('<Properties/>', () => {
  useRouteMatch.mockReturnValue({ path: '/my-properties' });

  it('The loader component is rendered when making API calls to fetch resource.', () => {
    usePropertiesByUserID.mockReturnValue({ userProperties: null });

    const { queryByText } = render(<Properties />);

    expect(queryByText('Properties')).toBeTruthy();
    expect(queryByText('Loading...')).toBeTruthy();
  });

  it('The user receives an alert notification if there are no properties.', () => {
    usePropertiesByUserID.mockReturnValue({ userProperties: [] });

    const { queryByText, debug } = render(<Properties />);

    expect(queryByText('Properties')).toBeTruthy();
    expect(
      queryByText(
        'Ooops! No properties found, start posting property ads for free.'
      )
    ).toBeTruthy();
  });

  it('If properties are found they are rendered', () => {
    usePropertiesByUserID.mockReturnValue({
      userProperties: [
        {
          id: '1',
          city: 'Test City',
          location: 'Test Location',
          availableTo: 'rent',
          numberOfBathrooms: '2',
          numberOfBedrooms: '3',
          description: 'Test Description',
          mobileNumber: '123456',
          title: 'Test Title',
          imageUrls: ['https://test.image.com'],
        },
      ],
    });

    const { asFragment } = render(<Properties />);

    expect(asFragment()).toMatchSnapshot();
  });
});
