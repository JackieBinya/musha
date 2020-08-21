import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PasswordReset } from '../pages/PasswordReset';
import { firebase } from '../firebase';

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      sendPasswordResetEmail: jest.fn((email) => {
        return new Promise((resolve, reject) => {
          if (email === 'katebar.com') {
            reject({ code: 'auth/invalid-email' });
          }

          if (email === 'jane@bar.com') {
            reject({ code: 'auth/user-not-found' });
          }

          resolve();
        });
      }),
    })),
  },
}));

beforeEach(cleanup);

describe('<PasswordReset/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component renders successfully', () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <PasswordReset />
    );

    expect(queryByText('Password Reset')).toBeTruthy();
    expect(queryByLabelText('Email:', { selector: 'input' })).toBeTruthy();
    expect(queryByTestId('submit-action')).toBeTruthy();
  });

  it('Successful form submission', async () => {
    const { queryByText, queryByLabelText, queryByTestId, debug } = render(
      <PasswordReset />
    );

    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'kate@bar.com' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() =>
      expect(
        queryByText(
          'Check your inbox for further instructions on how to reset your password!'
        )
      ).toBeTruthy()
    );
  });
});

describe('Form captures submission errors', () => {
  it('Invalid email', async () => {
    const { queryByText, queryByLabelText, queryByTestId, debug } = render(
      <PasswordReset />
    );

    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'katebar.com' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() => expect(queryByText('Email invalid')).toBeTruthy());
  });

  it('User not found', async () => {
    const { queryByText, queryByLabelText, queryByTestId, debug } = render(
      <PasswordReset />
    );

    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'jane@bar.com' } });
    });

    fireEvent.submit(submitAction);

    await waitFor(() =>
      expect(
        queryByText(
          'An account associated with the provided email does not exist!'
        )
      ).toBeTruthy()
    );
  });
});
