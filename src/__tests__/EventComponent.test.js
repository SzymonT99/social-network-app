import { render, screen } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import Event from '../components/Event/Event';

const mockFn = jest.fn();

const MockEventComponent = () => (
  <ThemeProvider theme={appTheme}>
    <Event
      eventId={1}
      updateEvents={mockFn}
      title={'Testowe wydarzenie'}
      date="2022-04-28T04:30"
      eventImage={null}
      address={{
        addressId: 1,
        country: 'Polska',
        city: 'Tarnów',
        street: '',
        zipCode: '33-100',
      }}
      members={[
        {
          eventMember: {
            userId: 1,
            activityStatus: 'ONLINE',
            email: 'testowy@gmail.com',
            firstName: 'Jan',
            lastName: 'Kowalski',
            profilePhoto: null,
          },
          participationStatus: 'TAKE_PART',
          addedIn: '2022-04-28T04:30',
          invitationDate: null,
        },
      ]}
    />
  </ThemeProvider>
);

describe('EventComponent', () => {
  beforeEach(() => {
    render(<MockEventComponent />);
  });
  test('should render event name', () => {
    const eventNameEl = screen.getByText(/Testowe wydarzenie/i);
    expect(eventNameEl).toBeInTheDocument();
  });
  test('should render correct address', () => {
    const addressEl = screen.getByText('Polska, Tarnów, 33-100');
    expect(addressEl).toBeInTheDocument();
  });
  test('should render correct member information', () => {
    const memberInformation = screen.getByText(
      '0 os. interesuje się | 1 os. weźmie udział'
    );
    expect(memberInformation).toBeInTheDocument();
  });
});
