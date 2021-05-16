import React from 'react';
import { firebase } from '../firebase';
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PostPropertyAd } from '../pages/PostPropertyAd';

import { toHaveClass } from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveClass });

jest.mock('react', () => {
  const ActualReact = require.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      currentUser: {
        uid: '123456',
        email: 'foo@bar.com',
      },
    }),
  };
});

jest.mock('../firebase', () => {
  return {
    firebase: {
      firestore: jest.fn(() => ({
        collection: jest.fn((properties) => ({
          add: jest.fn((data) => {
            return new Promise((resolve, reject) => {
              if (!data) reject();

              resolve();
            });
          }),
        })),
      })),
    },
  };
});

beforeEach(cleanup);

describe('<PostPropertyAd/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component is successfully rendered', () => {
    const { asFragment } = render(<PostPropertyAd />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Successful form submission', async () => {
    const { queryByLabelText, queryByTestId } = render(<PostPropertyAd />);
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    // Checks that the modal becomes visible after a successful form submission
    await waitFor(() => {
      expect(alertMessage).toHaveClass('form-modal-container show');
    });
  });
});

describe('Form handles submission errors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('AvailableTo is a required field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      '';
      expect(queryByText('Required!')).toBeTruthy();
    });
  });

  it('Title is a required field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: null } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      '';
      expect(queryByText('The title is required!')).toBeTruthy();
    });
  });

  it('Mobile Number is a required field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: null } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      '';
      expect(queryByText('Required!')).toBeTruthy();
    });
  });

  it('City is a required field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: null } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(queryByText('The city is required!')).toBeTruthy();
    });
  });

  it('Location is a required field', async () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: null } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: 'Test description' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      '';
      expect(queryByText('The location is required!')).toBeTruthy();
    });
  });

  it('Description is a required field', async () => {
    const { debug, queryByText, queryByLabelText, queryByTestId } = render(
      <PostPropertyAd />
    );
    const availableForRent = queryByLabelText('Rent');
    const titleInput = queryByLabelText('*Ad title:', { selector: 'input' });
    const mobileNumberInput = queryByLabelText('*Your mobile number:', {
      selector: 'input',
    });
    const cityInput = queryByLabelText('*City:', { selector: 'input' });
    const locationInput = queryByLabelText('*Location/Suburb:', {
      selector: 'input',
    });
    const selectBedrooms = queryByLabelText(
      'Choose the number of bedrooms in your property:'
    );
    const selectBathrooms = queryByLabelText(
      'Choose the number of bathrooms in your property:'
    );
    const description = queryByLabelText('*Description:', {
      selector: 'textarea',
    });
    const alertMessage = queryByTestId('alert-message');

    const submitAction = queryByTestId('submit-action');

    expect(alertMessage).toHaveClass('form-modal-container hide');

    act(() => {
      fireEvent.click(availableForRent);
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(mobileNumberInput, { target: { value: '123456' } });
      fireEvent.change(cityInput, { target: { value: 'Test City' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(selectBedrooms, { target: { value: '1' } });
      fireEvent.change(selectBathrooms, { target: { value: '3' } });
      fireEvent.change(description, { target: { value: null } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => {
      '';
      expect(queryByText('The property description is required!')).toBeTruthy();
    });
  });
});
