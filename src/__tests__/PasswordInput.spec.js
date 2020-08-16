import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PasswordInput } from '../components/PasswordInput';
import { toHaveAttribute } from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveAttribute });

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

    const { queryByLabelText, debug } = render(
      <PasswordInput password={''} setPassword={setPassword} />
    );

    const passwordInput = queryByLabelText('Password:', { selector: 'input' });

    fireEvent.change(passwordInput, { target: { value: 'test' } });

    expect(setPassword).toHaveBeenCalledTimes(1);
  });

  it('Toggle password visibility using mouse events', () => {
    const setPassword = jest.fn();

    const { queryByTestId, queryByLabelText } = render(
      <PasswordInput password={'password'} setPassword={setPassword} />
    );

    const svg = queryByTestId('svg-icon');

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'password');

    fireEvent.mouseEnter(svg);

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'text');

    fireEvent.mouseLeave(svg);

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'password');
  });

  it('Toggle password visibility using touch events', () => {
    const setPassword = jest.fn();

    const { queryByTestId, queryByLabelText } = render(
      <PasswordInput password={'password'} setPassword={setPassword} />
    );

    const svg = queryByTestId('svg-icon');

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'password');

    fireEvent.touchStart(svg);

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'text');

    fireEvent.touchEnd(svg);

    expect(queryByLabelText('Password:')).toHaveAttribute('type', 'password');
  });
});
