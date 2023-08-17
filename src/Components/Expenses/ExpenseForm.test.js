import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../Store/store';
import { BrowserRouter } from 'react-router-dom';

import ExpenseForm from './ExpenseForm';

describe('Greeting component', () =>{
test('renders "Price" label in App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
    <ExpenseForm/>
      </BrowserRouter>
    </Provider>
  );
  
  const priceLabel = getByText('Price:');
  expect(priceLabel).toBeInTheDocument();
});
test('renders "Description" label in App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
    <ExpenseForm/>
      </BrowserRouter>
    </Provider>
  );
  
  const priceLabel = getByText('Description:');
  expect(priceLabel).toBeInTheDocument();
});
test('renders "Category" label in App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
    <ExpenseForm/>
      </BrowserRouter>
    </Provider>
  );
  
  const priceLabel = getByText('Category:');
  expect(priceLabel).toBeInTheDocument();
});
})