import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PasswordInput } from '../components/PasswordInput';

beforeEach(cleanup);

describe('<PasswordInput/>', () => {
  it('Component is successfully rendered', () => {
    const setPassword = jest.fn();

    const { queryByLabelText } = render(
      <PasswordInput password={''} setPassword={setPassword} />
    );

    expect(queryByLabelText('Password:', { selector: 'input' })).toBeTruthy();
  });

  it('Input can capture changes', () => {
    const setPassword = jest.fn();

    const { queryByLabelText } = render(
      <PasswordInput password={''} setPassword={setPassword} />
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });

    fireEvent.change(passwordInput, { target: { value: 'test' } });

    expect(setPassword).toHaveBeenCalledTimes(1);
  });
});
