import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { Login } from '../pages/Login';
import { firebase } from '../firebase';

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn((email, password) => {
        return new Promise((resolve, reject) => {
          if (email === 'katebar.com') {
            reject({ code: 'auth/invalid-email' });
          }

          if (email === 'user@bar.com') {
            reject({ code: 'auth/user-disabled' });
          }

          if (email === 'jane@bar.com') {
            reject({ code: 'auth/user-not-found' });
          }

          if (password === 'password') {
            reject({ code: 'auth/wrong-password' });
          }
          resolve();
        });
      }),
    })),
  },
}));

beforeEach(cleanup);

describe('<Login/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component is successfully rendered...', () => {
    const { queryByText, queryByLabelText, queryByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(queryByLabelText('Password:', { selector: 'input' })).toBeTruthy();
    expect(queryByLabelText('Email:', { selector: 'input' })).toBeTruthy();
    expect(queryByText('Login')).toBeTruthy();
    expect(queryByText('Have you forgotten your password?')).toBeTruthy();
    expect(queryByTestId('submit-action')).toBeTruthy();
  });

  it('Successful form submission', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

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

    await waitFor(() =>
      expect(
        queryByText('Congrats 🥳, you are successfully logged in.')
      ).toBeTruthy()
    );
  });
});

describe('Form can capture error submissions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid email', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });
    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(emailInput, { target: { value: 'katebar.com' } });
    });
    expect(emailInput.value).toBe('katebar.com');
    expect(passwordInput.value).toBe('123456');

    fireEvent.submit(submitAction);

    await waitFor(() =>
      expect(queryByText('Email address is not valid!')).toBeTruthy()
    );
  });

  it('Account suspended', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });
    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(emailInput, { target: { value: 'user@bar.com' } });
    });
    expect(emailInput.value).toBe('user@bar.com');
    expect(passwordInput.value).toBe('123456');

    fireEvent.submit(submitAction);

    await waitFor(() =>
      expect(queryByText('Your account has been suspended!')).toBeTruthy()
    );
  });

  it('User not found', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });
    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(emailInput, { target: { value: 'jane@bar.com' } });
    });
    expect(emailInput.value).toBe('jane@bar.com');
    expect(passwordInput.value).toBe('123456');

    fireEvent.submit(submitAction);

    await waitFor(() =>
      expect(queryByText('Email does no exist!')).toBeTruthy()
    );
  });

  it('Wrong Password', async () => {
    const { queryByTestId, queryByLabelText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });
    const emailInput = queryByLabelText('Email:', { selector: 'input' });
    const submitAction = queryByTestId('submit-action');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(emailInput, { target: { value: 'kate@bar.com' } });
    });
    expect(emailInput.value).toBe('kate@bar.com');
    expect(passwordInput.value).toBe('password');

    fireEvent.submit(submitAction);

    await waitFor(() => expect(queryByText('Invalid password!')).toBeTruthy());
  });
});
