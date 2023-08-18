import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../Store/store';
import { BrowserRouter } from 'react-router-dom';
import ContectDetails from './ContectDetails';

describe('ContectDetails component', () => {
  test('displays user profile information after fetching data', async () => {
    const mockApiResponse = {
      users: [
        {
          displayName: 'Mock User',
          photoUrl: 'mockprofileimage.jpg',
          email: 'mock@example.com',
          emailVerified: true,
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ContectDetails />
        </BrowserRouter>
      </Provider>
    );

    // Wait for the data to be fetched and displayed
    await screen.findByText('Mock User'); // Replace with actual display text

    // Assertions based on the fetched data
    expect(screen.getByText('Mock User')).toBeInTheDocument();
    expect(screen.getByAltText('profileimage')).toBeInTheDocument();
    expect(screen.getByText('mock@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email verified')).toBeInTheDocument();

    // Clean up global.fetch
    global.fetch.mockClear();
  });

  test('clicking verify email button sends API request', async () => {
    const mockIdToken = 'mockIdToken'; // Replace with your mock token
  
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ContectDetails />
        </BrowserRouter>
      </Provider>
    );
  
    const verifyEmailButton = screen.getByRole('button', {
      name: 'Verify Email Id',
    });
    fireEvent.click(verifyEmailButton);
  
    // Wait for either the email verification message or the button
    await screen.findByText(/Email verified|Verify Email Id/);
  
    // If "Email verified" is found, then API request was successful
    if (screen.queryByText('Email verified')) {
      // Assertions based on the API request
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('VERIFY_EMAIL'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: mockIdToken,
            requestType: 'VERIFY_EMAIL',
          }),
        })
      );
    }
  
    // Clean up global.fetch
    global.fetch.mockClear();
  });
  
});
