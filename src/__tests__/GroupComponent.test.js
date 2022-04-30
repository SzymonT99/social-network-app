import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import { Provider } from 'react-redux';
import React from 'react';
import { loadState } from '../localStorage';
import configureStore from '../redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import Group from '../components/Group/Group';
import { formatBaseDate } from '../utils/formatBaseDate';

const initialState = loadState();

const store = configureStore(initialState, {});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

const MockGroupComponent = () => (
  <ThemeProvider theme={appTheme}>
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
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
