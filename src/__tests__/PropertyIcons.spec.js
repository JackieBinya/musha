import React from 'react';
import { MemoryRouter, useRouteMatch } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { PropertyIcons } from '../components/PropertyIcons';
import { firebase } from '../firebase';

jest.mock('../firebase', () => {
  const properties = {};
  const id = 1;

  return {
    firebase: {
      firestore: jest.fn(() => ({
        collection: jest.fn((properties) => ({
          doc: jest.fn((id) => ({
            delete: jest.fn().mockResolvedValue('Deleted'),
          })),
        })),
      })),
    },
  };
});

beforeEach(cleanup);

describe('<PropertyIcons/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Edit icons container is rendered in the my-properties url upon its render the confirm delete modal is closed ', () => {
    useRouteMatch.mockReturnValue({ url: '/my-properties' });

    const { queryByTestId, queryText } = render(
      <MemoryRouter>
        <PropertyIcons
          id="1"
          location="Test Location"
          numberOfBathrooms="shared"
          numberOfBedrooms="2"
        />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('edit-icons')).toBeTruthy();
    expect(screen.queryByText('Are you sure you want to delete?')).toBeFalsy();
    expect(screen.queryByTestId('edit-link')).toBeTruthy();
    expect(screen.queryByTestId('trash-icon-button')).toBeTruthy();
  });

  it('When a user clicks trash icon a confirm delete modal pops up and conversely when the user clicks cancel the modal closes', () => {
    useRouteMatch.mockReturnValue({ url: '/my-properties' });

    const { queryByTestId, queryText } = render(
      <MemoryRouter>
        <PropertyIcons
          id="1"
          location="Test Location"
          numberOfBathrooms="shared"
          numberOfBedrooms="2"
        />
      </MemoryRouter>
    );

    const trashIconButton = screen.queryByTestId('trash-icon-button');

    fireEvent.click(trashIconButton, { target: { value: '' } });

    expect(screen.queryByText('Are you sure you want to delete?')).toBeTruthy();
    expect(screen.queryByTestId('cancel-button')).toBeTruthy();
    expect(screen.queryByTestId('delete-button')).toBeTruthy();
    expect(screen.queryByTestId('trash-icon-button')).toBeFalsy();

    const cancelButton = screen.queryByTestId('cancel-button');
    fireEvent.click(cancelButton, { target: { value: '' } });

    expect(screen.queryByText('Are you sure you want to delete?')).toBeFalsy();
    expect(screen.queryByTestId('cancel-button')).toBeFalsy();
    expect(screen.queryByTestId('delete-button')).toBeFalsy();
    expect(screen.queryByTestId('trash-icon-button')).toBeTruthy();
  });
  ``;
  it('When a user clicks delete button the confirm delete modal is closed', async () => {
    useRouteMatch.mockReturnValue({ url: '/my-properties' });

    const { queryByTestId } = render(
      <MemoryRouter>
        <PropertyIcons
          id="1"
          location="Test Location"
          numberOfBathrooms="shared"
          numberOfBedrooms="2"
        />
      </MemoryRouter>
    );

    const trashIconButton = screen.queryByTestId('trash-icon-button');

    act(() => {
      fireEvent.click(trashIconButton, { target: { value: '' } });
    });

    const deleteButton = screen.queryByTestId('delete-button');

    act(() => {
      fireEvent.click(deleteButton, { target: { value: '' } });
    });

    await waitForElementToBeRemoved(() =>
      queryByTestId('confirm-delete-modal')
    );

    expect(screen.queryByTestId('confirm-delete-modal')).toBeNull();
  });
});
