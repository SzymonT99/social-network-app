import { render, screen, waitFor, fireEvent } from '../utils/testsWrapper';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const MockRegisterPage = () => (
  <ThemeProvider theme={appTheme}>
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  </ThemeProvider>
);

describe('RegisterPage', () => {
  beforeEach(() => {
    render(<MockRegisterPage />);
  });
  test('should render register form', () => {
    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();
  });
  test('password should be longer than 10 characters', async () => {
    const passwordInput = screen.getByLabelText('Hasło');
    const submitButton = screen.getByRole('button', { name: 'Załóż konto' });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
    const passwordError = await waitFor(() =>
      screen.getByText('Hasło powinno mieć minimum 10 znaków')
    );
    expect(passwordInput).toBeInvalid();
    expect(passwordError).toBeInTheDocument();
  });
  test('should valid email input', async () => {
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Załóż konto' });
    fireEvent.change(emailInput, { target: { value: 'tester.com' } });
    fireEvent.click(submitButton);
    const emailError = await waitFor(() =>
      screen.getByText('Nieprawidłowy email')
    );
    expect(emailError).toBeInTheDocument();
  });
});
