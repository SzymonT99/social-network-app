import { render, screen, waitFor, fireEvent } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import ChatInput from '../components/ChatInput/ChatInput';

const mockFn = jest.fn();

const MockChatInput = () => (
  <ThemeProvider theme={appTheme}>
    <ChatInput sendTypingMessage={mockFn} sendMessage={mockFn} />
  </ThemeProvider>
);

describe('ChatInput', () => {
  beforeEach(() => {
    render(<MockChatInput />);
  });

  test('should render chat button', () => {
    const sendingMessageBtn = screen.getByRole('button', {
      name: 'Wyślij',
    });
    expect(sendingMessageBtn).toBeInTheDocument();
  });
  test('should chat button has proper class', () => {
    const sendingMessageBtn = screen.getByRole('button', {
      name: 'Wyślij',
    });
    expect(sendingMessageBtn).toHaveClass('MuiButton-contained');
  });
  test('should open popup with emoji', async () => {
    const emojiBtn = screen.getByTestId('emoji-picker');
    fireEvent.click(emojiBtn);
    const emojiListTitle = await waitFor(() =>
      screen.getByText(/Wybierz emotikon/i)
    );
    expect(emojiListTitle).toBeTruthy();
  });
});
