import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
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
test('updates input fields on change', () => {
  const { getByLabelText} = render(
    <Provider store={store}>
      <BrowserRouter>
    <ExpenseForm/>
      </BrowserRouter>
    </Provider>
  );
  const priceInput = screen.getByLabelText('Price:');
 

  fireEvent.change(priceInput, { target: { value: '100' } });
  expect(priceInput.value).toBe('100');
  });


test('updates input fields on change', () => {
  const { getByLabelText} = render(
    <Provider store={store}>
      <BrowserRouter>
    <ExpenseForm/>
      </BrowserRouter>
    </Provider>
  );
   const descriptionInput = screen.getByLabelText('Description:');
   const categoryInput = screen.getByLabelText('Category:');

   fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
   fireEvent.change(categoryInput, { target: { value: 'Food' } });

    expect(descriptionInput.value).toBe('Test description');
    expect(categoryInput.value).toBe('Food');
  })
})