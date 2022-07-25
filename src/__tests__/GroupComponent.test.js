import { render, screen } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import Group from '../components/Group/Group';
import { formatBaseDate } from '../utils/formatBaseDate';

const MockGroupComponent = () => (
  <ThemeProvider theme={appTheme}>
    <Group
      groupId={1}
      name="Grupa testowa"
      groupCreationDate={'2022-04-01T17:31:24'}
      interests={[{ interestId: 1, name: 'Testowanie' }]}
      membersNumber={1}
      members={[
        {
          groupMemberId: 1,
          user: {
            userId: 1,
            activityStatus: 'ONLINE',
            email: 'tester@gmail.com',
            firstName: 'Tester',
            lastName: 'Tester',
            profilePhoto: null,
          },
          address: null,
          groupPermissionType: 'ADMINISTRATOR',
          groupMemberStatus: 'JOINED',
          addedIn: new Date().toString(),
          invitationDisplayed: true,
        },
      ]}
      postsNumber={6}
      groupImage={null}
    />
  </ThemeProvider>
);

describe('GroupComponent', () => {
  beforeEach(() => {
    render(<MockGroupComponent />);
  });
  test('should render group name', () => {
    const groupNameEl = screen.getByText(/Grupa Testowa/i);
    expect(groupNameEl).toBeInTheDocument();
  });
  test('should show default image', () => {
    const groupImage = screen.getByRole('img');
    expect(groupImage).toHaveAttribute(
      'src',
      require('../assets/default-image.png')
    );
  });
  test('should format date', () => {
    let receivedDate = '2022-04-01T17:31:24';
    const groupCreationDate = screen.getByText(formatBaseDate(receivedDate));
    expect(groupCreationDate).toBeInTheDocument();
  });
});
