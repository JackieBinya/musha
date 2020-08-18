import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  screen,
  act,
  waitFor,
  queryByText,
} from '@testing-library/react';
import { SignUp } from '../pages/SignUp';
import { toHaveClass } from '@testing-library/jest-dom/matchers';
import { PasswordInput } from '../components/PasswordInput';
import { signUpHelper } from '../helpers';

expect.extend({ toHaveClass });

jest.mock('../helpers', () => {
  return {
    signUpHelper: jest.fn((email, password) => {
      return new Promise((resolve, reject) => {
        if (email === 'foo@bar.com') {
          reject({ code: 'auth/email-already-in-use' });
        }

        if (email === 'foobar.com') {
          reject({ code: 'auth/invalid-email' });
        }

        if (password === '123') {
          reject({ code: 'auth/weak-password' });
        }

        resolve();
      });
    }),
  };
});

beforeEach(cleanup);

describe('<SignUp/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component is successfully rendered', () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(<SignUp />);

    expect(queryByLabelText('Password:', { selector: 'input' })).toBeTruthy();
    expect(queryByLabelText('Email:', { selector: 'input' })).toBeTruthy();
    expect(queryByText('Sign up')).toBeTruthy();
    expect(queryByTestId('submit-action')).toBeTruthy();
  });

  it('Successful form submission', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(<SignUp />);

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });
    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(emailInput, { target: { value: 'kate@bar.com' } });
    });
    expect(emailInput.value).toBe('kate@bar.com');
    expect(passwordInput.value).toBe('123456');

    fireEvent.submit(submitAction);

    await waitFor(() => {
      expect(signUpHelper).toBeCalledTimes(1);
      expect(
        queryByText('Congrats 🥳, your account has been successfully created!')
      ).toBeTruthy();
    });
  });

  describe('Form can capture errors', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Repeat email', async () => {
      const { queryByTestId, queryByLabelText, queryByText } = render(
        <SignUp />
      );

      const passwordInput = queryByLabelText('Password:', {
        selector: 'input',
      });
      const emailInput = queryByLabelText('Email:', { selector: 'input' });
      const submitAction = queryByTestId('submit-action');

      act(() => {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(emailInput, { target: { value: 'foo@bar.com' } });
      });

      fireEvent.submit(submitAction);

      await waitFor(() => {
        expect(signUpHelper).toBeCalledTimes(1);
        expect(queryByText('Email is already taken!')).toBeTruthy();
      });
    });

    it('Invalid email', async () => {
      const { queryByTestId, queryByLabelText, queryByText } = render(
        <SignUp />
      );

      const passwordInput = queryByLabelText('Password:', {
        selector: 'input',
      });
      const emailInput = queryByLabelText('Email:', { selector: 'input' });
      const submitAction = queryByTestId('submit-action');

      act(() => {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(emailInput, { target: { value: 'foobar.com' } });
      });

      fireEvent.submit(submitAction);

      await waitFor(() => {
        expect(signUpHelper).toBeCalledTimes(1);
        expect(queryByText('Email is invalid!')).toBeTruthy();
      });
    });

    it('Weak password', async () => {
      const { queryByTestId, queryByLabelText, queryByText } = render(
        <SignUp />
      );

      const passwordInput = queryByLabelText('Password:', {
        selector: 'input',
      });
      const emailInput = queryByLabelText('Email:', { selector: 'input' });
      const submitAction = queryByTestId('submit-action');

      act(() => {
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.change(emailInput, { target: { value: 'lisa@bar.com' } });
      });

      fireEvent.submit(submitAction);

      await waitFor(() => {
        expect(signUpHelper).toBeCalledTimes(1);
        expect(
          queryByText('Password should be at least six characters long!')
        ).toBeTruthy();
      });
    });
  });
});
