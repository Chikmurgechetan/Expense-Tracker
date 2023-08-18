import React from 'react';
import { render, screen } from '@testing-library/react';
import SingUpForm from './SingUpForm';
import { Provider } from 'react-redux';
import store from '../../Store/store';
import { BrowserRouter } from 'react-router-dom';

describe('SingUpForm component', () => {
  test('renders login button', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'first post' }],
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SingUpForm />
        </BrowserRouter>
      </Provider>
    );

    const loginButton = await screen.findByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });
  
  test('renders sign up button', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'first post' }],
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SingUpForm />
        </BrowserRouter>
      </Provider>
    );

    const signUpButton = await screen.findByText("Don't Have an Account? Sign Up");
    expect(signUpButton).toBeInTheDocument();
  });
});
