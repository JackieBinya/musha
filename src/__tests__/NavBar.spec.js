import React from 'react';
import { firebase } from '../firebase';
import { Router, useLocation, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NavBar from '../components/NavBar';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
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

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      signOut: jest.fn(),
    })),
  },
}));

beforeEach(cleanup);

describe('<NavBar/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('When a user clicks the hamburger icon the mobile menu is rendered', async () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(
      <Router history={history}>
        <NavBar />
      </Router>
    );

    const openMenuButton = queryByTestId('open-menu-action');

    fireEvent.click(openMenuButton);

    await waitFor(() =>
      expect(queryByTestId('mobile-menu-list')).toHaveClass(
        'menu-list__mobile show'
      )
    );

    useLocation.mockReturnValue('/my-properties');
  });

  it('When a user clicks the close icon the mobile menu is closed', async () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(
      <Router history={history}>
        <NavBar />
      </Router>
    );

    const closeMenuButton = queryByTestId('close-menu-action');

    fireEvent.click(closeMenuButton);

    await waitFor(() =>
      expect(queryByTestId('mobile-menu-list')).toHaveClass(
        'menu-list__mobile hide'
      )
    );
  });

  it('Signout captures a click action', async () => {
    const history = createMemoryHistory();
    const route = '/my-properties';
    history.push(route);

    const { queryByTestId } = render(
      <Router history={history}>
        <NavBar />
      </Router>
    );

    const logoutButton = queryByTestId('logout-action');

    fireEvent.click(logoutButton);
  });
});
