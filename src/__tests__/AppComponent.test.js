import { render, screen, waitFor, fireEvent } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import App from '../app/App';

const MockApp = () => (
  <ThemeProvider theme={appTheme}>
    <App />
  </ThemeProvider>
);

describe('AppComponent', () => {
  beforeEach(() => {
    render(<MockApp />);
  });

  test('should render app name', () => {
    const appNameEl = screen.getByText(/Social Network/i);
    expect(appNameEl).toBeTruthy();
  });
  test('should render public button navigation', () => {
    const publicContentLink = screen.getByRole('button', {
      name: 'Przeglądaj publiczne treści',
    });
    expect(publicContentLink).toBeInTheDocument();
  });
  test('should navigate to register page', async () => {
    const registerLink = screen.getByRole('button', {
      name: 'Załóż konto',
    });
    fireEvent.click(registerLink);
    const registerTitle = await waitFor(() =>
      screen.getByText(/Tworzenie konta/i)
    );
    expect(registerTitle).toBeInTheDocument();
  });
});
