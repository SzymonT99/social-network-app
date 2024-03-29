import userProfileTypes from '../types/userProfileTypes';
import authTypes from '../types/authTypes';
import userProfileService from '../../services/userService';
import { showNotification } from './notificationActions';
import { getActivityBoard } from './userActivityActions';
import groupTypes from '../types/groupTypes';
import { getUserFriends } from './friendAction';
import userService from '../../services/userService';
import adminTypes from '../types/adminTypes';

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
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addSchoolInformation = (school) => (dispatch, getState) => {
  return userProfileService
    .addSchoolInformation(school)
    .then((response) => {
      if (response.status === 201) {
        dispatch(
          getUserProfile(getState().selectedProfile.userProfile.userProfileId)
        );
        dispatch(showNotification('success', 'Dodano szkołę'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
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
          dispatch(
            getUserProfile(getState().selectedProfile.userProfile.userProfileId)
          );
          dispatch(
            showNotification('success', 'Zaaktualizowano informacje o szkole')
          );
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Niepoprawne dane'));
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
        dispatch(
          getUserProfile(getState().selectedProfile.userProfile.userProfileId)
        );
        dispatch(showNotification('success', 'Usunięto szkołę'));
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
        dispatch(
          getUserProfile(getState().selectedProfile.userProfile.userProfileId)
        );
        dispatch(showNotification('success', 'Dodano informacje o pracy'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
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
          dispatch(
            getUserProfile(getState().selectedProfile.userProfile.userProfileId)
          );
          dispatch(
            showNotification(
              'success',
              'Zaaktualizowano informacje o miejscu pracy'
            )
          );
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Niepoprawne dane'));
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
        dispatch(
          getUserProfile(getState().selectedProfile.userProfile.userProfileId)
        );
        dispatch(showNotification('success', 'Usunięto miejsce pracy'));
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
        dispatch(
          getUserFavouriteItems(
            getState().selectedProfile.userProfile.userProfileId
          )
        );
        dispatch(showNotification('success', 'Dodano element'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
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
          dispatch(
            getUserFavouriteItems(
              getState().selectedProfile.userProfile.userProfileId
            )
          );
          dispatch(showNotification('success', 'Zmieniono element'));
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

export const deleteFavouriteItem = (favouriteId) => (dispatch, getState) => {
  return userProfileService
    .deleteUserFavourite(favouriteId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(
          getUserFavouriteItems(
            getState().selectedProfile.userProfile.userProfileId
          )
        );
        dispatch(showNotification('success', 'Usunięto element'));
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
          dispatch({
            type: groupTypes.FETCH_POSSIBLE_INTERESTS,
            payload: {
              possibleInterests: data,
            },
          });
        });
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
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addUserInterests =
  (userId, interestId) => (dispatch, getState) => {
    return userProfileService
      .addUserInterests(userId, interestId)
      .then((response) => {
        if (response.status === 201) {
          dispatch(
            getUserInterests(
              getState().selectedProfile.userProfile.userProfileId
            )
          );
          dispatch(showNotification('success', 'Dodano zainteresowanie'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Niepoprawne dane'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteUserInterests =
  (userId, interestId) => (dispatch, getState) => {
    return userProfileService
      .deleteUserInterests(userId, interestId)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            getUserInterests(
              getState().selectedProfile.userProfile.userProfileId
            )
          );
          dispatch(showNotification('success', 'Usunięto zainteresowanie'));
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

export const changeProfilePhoto = (userId, photo) => (dispatch, getState) => {
  return userProfileService
    .addProfilePhoto(photo, userId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(userId));
        if (getState().auth.user.userId === userId) {
          dispatch(getUserProfile(userId, true));
        }
        dispatch(getUserFriends(getState().auth.user.userId, true));
        dispatch(getUserActivity(userId));
        dispatch(getUserImages(userId));
        dispatch(showNotification('success', 'Zmieniono zdjęcie profilowe'));
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

export const deleteProfilePhoto = (userId) => (dispatch, getState) => {
  return userProfileService
    .deleteProfilePhoto(userId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(userId));
        if (getState().auth.user.userId === userId) {
          dispatch(getUserProfile(userId, true));
        }
        dispatch(getUserFriends(getState().auth.user.userId, true));
        dispatch(getUserActivity(userId));
        dispatch(showNotification('success', 'Usunięto zdjęcie profilowe'));
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
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editProfileInformation =
  (userId, updatedProfile) => (dispatch, getState) => {
    return userProfileService
      .editProfileInformation(userId, updatedProfile)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserProfile(userId));
          if (getState().auth.user.userId === userId) {
            dispatch(getUserProfile(userId, true));
          }
          dispatch(getUserFriends(getState().auth.user.userId, true));
          dispatch(getUserActivity(userId));
          dispatch(
            showNotification('success', 'Zaaktualiowano dane profilowe')
          );
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

export const addUserAddress = (address, userId) => (dispatch) => {
  return userProfileService
    .addUserAddress(address)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserProfile(userId));
        dispatch(showNotification('success', 'Dodano adres'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
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

export const editUserAddress = (addressId, address, userId) => (dispatch) => {
  return userProfileService
    .editUserAddress(addressId, address)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(userId));
        dispatch(showNotification('success', 'Zaaktualiowano adres'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
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

export const changeUserStatus = (status) => (dispatch, getState) => {
  return userProfileService
    .changeUserStatus(status)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserProfile(getState().auth.user.userId, true));
        dispatch(getUserActivity(getState().auth.user.userId));
        dispatch(getActivityBoard());
        dispatch(showNotification('success', 'Zmieniono status'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const reportUser = (report) => (dispatch) => {
  return userService
    .reportUser(report)
    .then((response) => {
      if (response.status === 201) {
        dispatch(showNotification('success', 'Wysłano zgłoszenie'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono użytkownika'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changeProfileNav = (index) => ({
  type: userProfileTypes.SET_PROFILE_NAV_INDEX,
  payload: {
    index,
  },
});
