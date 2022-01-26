import userProfileTypes from '../types/userProfileTypes';
import authTypes from '../types/authTypes';
import userProfileService from '../../services/userService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

export const getUserProfile =
  (userId, forLoggedIn = false) =>
  (dispatch) => {
    return userProfileService
      .getUserProfile(userId)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            if (!forLoggedIn) {
              dispatch({
                type: userProfileTypes.FETCH_USER_PROFILE,
                payload: {
                  userProfile: data,
                },
              });
            } else {
              dispatch({
                type: authTypes.SAVE_LOGGED_USER_PROFILE,
                payload: {
                  userProfile: data,
                },
              });
            }
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

export const getUserFavouriteItems = (userId) => (dispatch) => {
  return userProfileService
    .getUserFavourites(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_FAVOURITES,
            payload: {
              userFavourites: data,
            },
          });
        });
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

export const addFavouriteItem = (favouriteItem) => (dispatch, getState) => {
  return userProfileService
    .addUserFavourite(favouriteItem)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserFavouriteItems(getState().auth.user.userId));
        dispatch(showNotification('success', 'Dodano element'));
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

export const editFavouriteItem =
  (favouriteId, favouriteItem) => (dispatch, getState) => {
    return userProfileService
      .editUserFavourite(favouriteId, favouriteItem)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserFavouriteItems(getState().auth.user.userId));
          dispatch(showNotification('success', 'Zmieniono element'));
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

export const deleteFavouriteItem = (favouriteId) => (dispatch, getState) => {
  return userProfileService
    .deleteUserFavourite(favouriteId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserFavouriteItems(getState().auth.user.userId));
        dispatch(showNotification('success', 'Usunięto element'));
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

export const getPossibleInterests = () => (dispatch) => {
  return userProfileService
    .getPossibleInterests()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_POSSIBLE_INTERESTS,
            payload: {
              possibleInterests: data,
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

export const getUserInterests = (userId) => (dispatch) => {
  return userProfileService
    .getUserInterests(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_INTERESTS,
            payload: {
              userInterests: data,
            },
          });
        });
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

export const addUserInterests = (interestId) => (dispatch, getState) => {
  return userProfileService
    .addUserInterests(interestId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserInterests(getState().auth.user.userId));
        dispatch(showNotification('success', 'Dodano zainteresowanie'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Nie uzupełniono danych'));
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

export const deleteUserInterests = (interestId) => (dispatch, getState) => {
  return userProfileService
    .deleteUserInterests(interestId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInterests(getState().auth.user.userId));
        dispatch(showNotification('success', 'Usunięto zainteresowanie'));
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

export const changeProfilePhoto = (userId, photo) => (dispatch) => {
  return userProfileService
    .addProfilePhoto(photo)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(userId));
        dispatch(getUserProfile(userId, true));
        dispatch(getUserActivity(userId));
        dispatch(showNotification('success', 'Zmieniono zdjęcie profilowe'));
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

export const deleteProfilePhoto = (userId) => (dispatch) => {
  return userProfileService
    .deleteProfilePhoto()
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(userId));
        dispatch(getUserProfile(userId, true));
        dispatch(getUserActivity(userId));
        dispatch(showNotification('success', 'Usunięto zdjęcie profilowe'));
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

export const getUserImages = (userId) => (dispatch) => {
  return userProfileService
    .getUserImages(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_IMAGES,
            payload: {
              images: data,
            },
          });
        });
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

export const editProfileInformation = (updatedProfile) => (dispatch) => {
  return userProfileService
    .editProfileInformation(updatedProfile)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('warning', 'Zaaktualiowano dane profilowe'));
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
