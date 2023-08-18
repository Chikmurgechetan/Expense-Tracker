import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../Store/store';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { authActions } from '../Store/Reduers/Autho-reducers';

describe('ProfilePage component', () => {
  test('renders complete profile button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>
    );

    const completeProfileButton = screen.getByRole('button', { name: 'Complete now' });
    expect(completeProfileButton).toBeInTheDocument();
  });

});
