import userProfileTypes from '../types/userProfileTypes';
import userProfileService from '../../services/userService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

export const getUserProfile = (userId) => (dispatch) => {
  return userProfileService
    .getUserProfile(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_PROFILE,
            payload: {
              userProfile: data,
            },
          });
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserActivity = (userId) => (dispatch) => {
  return userProfileService
    .getUserActivity(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_ACTIVITY,
            payload: {
              userActivity: data,
            },
          });
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addSchoolInformation = (school) => (dispatch, getState) => {
  console.log(school);
  return userProfileService
    .addSchoolInformation(school)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserProfile(getState().auth.user.userId));
        dispatch(showNotification('success', 'Dodano szkołę'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Nie uzupełniono danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editSchoolInformation =
  (schoolId, school) => (dispatch, getState) => {
    return userProfileService
      .editSchoolInformation(schoolId, school)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserProfile(getState().auth.user.userId));
          dispatch(
            showNotification('success', 'Zaaktualizowano informacje o szkole')
          );
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Nie uzupełniono danych'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteSchoolInformation = (schoolId) => (dispatch, getState) => {
  return userProfileService
    .deleteSchoolInformation(schoolId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(getState().auth.user.userId));
        dispatch(showNotification('success', 'Usunięto szkołę'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addWorkPlaceInformation = (workPlace) => (dispatch, getState) => {
  return userProfileService
    .addWorkPlaceInformation(workPlace)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserProfile(getState().auth.user.userId));
        dispatch(showNotification('success', 'Dodano informacje o pracy'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Nie uzupełniono danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editWorkPlaceInformation =
  (workId, updatedWorkPlace) => (dispatch, getState) => {
    return userProfileService
      .editWorkPlaceInformation(workId, updatedWorkPlace)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserProfile(getState().auth.user.userId));
          dispatch(
            showNotification(
              'success',
              'Zaaktualizowano informacje o miejscu pracy'
            )
          );
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Nie uzupełniono danych'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteWorkPlaceInformation = (workId) => (dispatch, getState) => {
  return userProfileService
    .deleteWorkPlaceInformation(workId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(getState().auth.user.userId));
        dispatch(showNotification('success', 'Usunięto miejsce pracy'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
