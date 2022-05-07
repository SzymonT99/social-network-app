import { render, screen, waitFor, fireEvent } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import PostForm from '../components/Forms/PostForm';
import Notification from '../components/Notification/Notification';
import Popup from '../components/Popup/Popup';

const MockPostForm = () => (
  <ThemeProvider theme={appTheme}>
    <Popup open type="post" title="Utwórz post" onClose={() => {}}>
      <PostForm closePopup={() => {}} />
    </Popup>
    <Notification />
  </ThemeProvider>
);

describe('PostForm', () => {
  beforeEach(() => {
    render(<MockPostForm />);
  });

  test('should render post form title', () => {
    const postFormTitle = screen.getByText(/Utwórz post/i);
    expect(postFormTitle).toBeInTheDocument();
  });
  test('should show error when content is empty', async () => {
    const createPostBtn = screen.getByRole('button', {
      name: 'Opublikuj post',
    });
    fireEvent.click(createPostBtn);
    const notification = await waitFor(() =>
      screen.getByTestId('notification')
    );
    expect(notification).toHaveTextContent('Podaj treść posta');
  });
  test('should render button for adding picture', () => {
    const imageBtn = screen.getByRole('button', {
      name: 'Zdjęcie/Obraz',
    });
    expect(imageBtn).toBeInTheDocument();
  });
});
