import { render, screen, waitFor, fireEvent } from '../utils/testsWrapper';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '../theme/appTheme';
import React from 'react';
import Popup from '../components/Popup/Popup';
import ProfileEditionForm from '../components/Forms/ProfileEditionForm';

const MockProfileForm = () => (
  <ThemeProvider theme={appTheme}>
    <Popup
      open
      type="profileForm"
      title="Zaaktualizuj informacje"
      onClose={() => {}}
    >
      <ProfileEditionForm
        closePopup={() => {}}
        editedFirstName="Jan"
        userId={1}
        editedLastName="Kowalski"
        editedAccess={true}
        editedGender="MALE"
        editedRelationship="SINGLE"
        editedDateOfBirth="1989-01-05"
        editedJob=""
        editedSkills=""
        editedAboutUser=""
      />
    </Popup>
  </ThemeProvider>
);

describe('ProfileForm', () => {
  beforeEach(() => {
    render(<MockProfileForm />);
  });

  test('should render profile form title', () => {
    const profileFormTitle = screen.getByText(/Zaaktualizuj informacje/i);
    expect(profileFormTitle).toBeInTheDocument();
  });
  test('name field cannot be empty', async () => {
    const nameInput = screen.getByLabelText('Imię');
    const formSubmit = screen.getByRole('button', {
      name: 'Zapisz zmiany',
    });
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(formSubmit);
    const error = await waitFor(() => screen.getByText(/Imię jest wymagane/i));
    expect(error).toBeInTheDocument();
    expect(nameInput).toBeInvalid();
  });
  test('should render typed description', async () => {
    const aboutUserInput = screen.getByLabelText('O mnie');
    fireEvent.change(aboutUserInput, { target: { value: 'Test' } });
    await waitFor(() => {
      expect(aboutUserInput).toHaveTextContent('Test');
    });
  });
});
