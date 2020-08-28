import React from 'react';
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
  queryByLabelText,
} from '@testing-library/react';
import { EmailInput } from '../components/EmailInput';

describe('<EmailInput/>', () => {
  it('Component is successfully rendered', () => {
    const setEmail = jest.fn();

    const { queryByLabelText } = render(
      <EmailInput email={''} setEmail={setEmail} />
    );

    expect(queryByLabelText('Email:', { selector: 'input' })).toBeTruthy();
  });

  it('Input can capture changes', () => {
    const setEmail = jest.fn();

    const { queryByLabelText } = render(
      <EmailInput email={''} setEmail={setEmail} />
    );

    const emailInput = queryByLabelText('Email:', { selector: 'input' });

    fireEvent.change(emailInput, { target: { value: 'test' } });

    expect(setEmail).toHaveBeenCalledTimes(1);
  });
});
