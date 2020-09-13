import React from 'react';
import { firebase } from '../firebase';
import { useProperty } from '../hooks';
import { useParams } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { EditPropertyAds } from '../pages/EditPropertyAd';

import { toHaveClass } from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveClass });

jest.mock('../hooks', () => ({
  useProperty: jest.fn(),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn((properties) => ({
        doc: jest.fn((id) => ({
          update: jest.fn((data) => {
            return new Promise((resolve, reject) => {
              if (!data) reject();

              resolve();
            });
          }),
        })),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<EditPropertyAd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('The loader component is rendered during API call to fetch resources.', () => {
    useParams.mockReturnValue({ propertyId: '1' });
    useProperty.mockReturnValue({ property: null });

    const { queryByText } = render(<EditPropertyAds />);

    expect(queryByText('Loading...')).toBeTruthy();
  });

  it('The component is successfully rendered when the property resource is fetched from the server.', () => {
    useParams.mockReturnValue({ propertyId: '1' });
    useProperty.mockReturnValue({
      property: {
        city: 'Test City',
        location: 'Test Location',
        availableTo: 'rent',
        numberOfBathrooms: '2',
        numberOfBedrooms: '3',
        description: 'Test Description',
        mobileNumber: '123456',
        title: 'Test Title',
      },
    });

    const { asFragment } = render(<EditPropertyAds />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Back button action is captured', () => {
    useParams.mockReturnValue({ propertyId: '1' });
    useProperty.mockReturnValue({
      property: {
        city: 'Test City',
        location: 'Test Location',
        availableTo: 'rent',
        numberOfBathrooms: '2',
        numberOfBedrooms: '3',
        description: 'Test Description',
        mobileNumber: '123456',
        title: 'Test Title',
      },
    });

    const history = {
      goBack: jest.fn(),
    };

    const { queryByTestId } = render(<EditPropertyAds history={history} />);

    const backButton = queryByTestId('back-button');

    fireEvent.click(backButton);

    expect(history.goBack).toBeCalledTimes(1);
  });
});

describe('The user can update a property ad', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  useParams.mockReturnValue({ propertyId: '1' });
  useProperty.mockReturnValue({
    property: {
      city: 'Test City',
      location: 'Test Location',
      availableTo: 'rent',
      numberOfBathrooms: '2',
      numberOfBedrooms: '3',
      description: 'Test Description',
      mobileNumber: '123456',
      title: 'Test Title',
    },
  });

  it('User can update the city', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const cityInput = queryByLabelText('*City:', { selector: 'input' });

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(cityInput, { target: { value: 'Updated City' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the location', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(locationInput, {
        target: { value: 'Updated Location' },
      });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the mobile number', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(mobileNumberInput, { target: { value: '000111' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the available to field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const availableForSale = queryByLabelText('Sale');

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.click(availableForSale);
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the mobile number', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(mobileNumberInput, {
        target: { value: 'Updated Title' },
      });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the number of bathrooms', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds />
    );

    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(selectBathrooms, { target: { value: 'studio' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });
  });

  it('User can update the number of bedrooms and the go-to-my-properties-action can be captured.', async () => {
    const history = {
      goBack: jest.fn(),
    };

    const { queryByText, queryByLabelText, queryByTestId } = render(
      <EditPropertyAds history={history} />
    );

    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );

    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(selectBedrooms, { target: { value: 'shared' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(
        queryByText('Property ID:1 is successfully updated.')
      ).toBeTruthy();
      expect(queryByTestId('edit-form')).toHaveClass('hide');
    });

    const goToMyPropertiesAction = queryByTestId('go-to-my-properties-action');

    fireEvent.click(goToMyPropertiesAction);

    expect(history.goBack).toBeCalledTimes(1);
  });
});
