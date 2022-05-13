import { render, screen } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import FriendListItem from '../components/FriendListItem/FriendListItem';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const MockFriendListItem = () => (
  <ThemeProvider theme={appTheme}>
    <FriendListItem
      userFriendId={1}
      friendName="Jan Kowalski"
      friendPhoto={{
        filename: 'avatar1.png',
        url: 'http://localhost:8080/api/images/ed08460c-bc01-4aac-a2d0-97f13436593d',
        type: 'image/png',
        addedIn: '2022-04-23T16:41:13',
      }}
      friendStatus="BE_RIGHT_BACK"
    />
  </ThemeProvider>
);

describe('FriendListItemComponent', () => {
  beforeEach(() => {
    render(<MockFriendListItem />);
  });
  test('should render friend name', () => {
    const friendNameEl = screen.getByText(/Jan Kowalski/i);
    expect(friendNameEl).toBeInTheDocument();
  });
  test('should have correct status icon style', () => {
    const statusIcon = screen.getByTestId('FiberManualRecordIcon');
    expect(statusIcon).toHaveStyle(`color: ${activeStatus.BE_RIGHT_BACK}`);
  });
  test('should friend image has correct attribute src', () => {
    const friendImg = screen.getByRole('img');
    expect(friendImg).toHaveAttribute(
      'src',
      'http://localhost:8080/api/images/ed08460c-bc01-4aac-a2d0-97f13436593d'
    );
  });
});
