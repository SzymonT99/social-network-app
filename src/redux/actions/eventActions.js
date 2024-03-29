import eventService from '../../services/eventService';
import eventTypes from '../types/eventTypes';
import { showNotification } from './notificationActions';

export const createEvent = (eventFormData) => (dispatch) => {
  return eventService
    .createEvent(eventFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getEvents());
        dispatch(showNotification('success', 'Utworzono wydarzenie'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editEvent = (eventId, formData) => (dispatch, getState) => {
  return eventService
    .editEvent(eventId, formData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getEvents());
        dispatch(getEventById(getState().events.eventDetails.eventId));
        dispatch(showNotification('success', 'Edytowano wydarzenie'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEvent = (eventId) => (dispatch) => {
  return eventService
    .deleteEvent(eventId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getEvents());
        dispatch(showNotification('success', 'Usunięto wydarzenie'));
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

export const getEventById = (eventId) => (dispatch) => {
  return eventService
    .getEventById(eventId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: eventTypes.FETCH_EVENT_DETAILS,
            payload: {
              eventDetails: data,
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

export const getEvents = () => (dispatch) => {
  return eventService
    .getEvents()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: eventTypes.FETCH_EVENTS,
            payload: {
              allEvents: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const inviteToEvent =
  (eventId, invitedUserId) => (dispatch, getState) => {
    return eventService
      .inviteToEvent(eventId, invitedUserId)
      .then((response) => {
        if (response.status === 201) {
          dispatch(showNotification('success', 'Wysłano zaproszenie'));
          dispatch(getEventInvitations());
          dispatch(getEventById(getState().events.eventDetails.eventId));
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Już wysłano zaproszenie do znajomego')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const respondToEvent = (eventId, reaction) => (dispatch, getState) => {
  return eventService
    .respondToEvent(eventId, reaction)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getEvents());
        dispatch(getEventById(getState().events.eventDetails.eventId));
        dispatch({
          type: eventTypes.UPDATE_RESPOND_TO_EVENT,
          payload: {
            eventId: eventId,
            userId: getState().auth.user.userId,
          },
        });
        dispatch({
          type: eventTypes.RESPOND_TO_EVENT,
          payload: {
            eventId: eventId,
            member: {
              eventMember: {
                userId: getState().auth.user.userId,
                activityStatus: 'ONLINE',
                email: getState().auth.userProfile.email,
                firstName: getState().auth.userProfile.firstName,
                lastName: getState().auth.userProfile.lastName,
                profilePhoto: getState().auth.userProfile.profilePhoto,
              },
              participationStatus: reaction,
              addedIn: new Date().toDateString(),
              invitationDate: null,
              invitationDisplayed: false,
            },
          },
        });
        if (reaction === 'TAKE_PART') {
          dispatch(showNotification('success', 'Dołączono do wydarzenia'));
        } else if (reaction === 'INTERESTED') {
          dispatch(
            showNotification('success', 'Określono zainteresowanie wydarzeniem')
          );
        } else if (reaction === 'REJECT') {
          dispatch(
            showNotification('success', 'Odrzucono zaproszenie na wydarzenie')
          );
        }
      } else if (response.status === 409) {
        dispatch(
          showNotification(
            'warning',
            'Zareagowano już w ten sposób na wydarzenie'
          )
        );
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Nieznana reakcja na wydarzenie'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getEventInvitations = () => (dispatch) => {
  return eventService
    .getEventInvitations()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: eventTypes.FETCH_EVENT_INVITATIONS,
            payload: {
              eventInvitations: data,
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

export const shareEvent = (eventId) => (dispatch, getState) => {
  return eventService
    .shareEvent(eventId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(showNotification('success', 'Udostępniono wydarzenie'));
        dispatch(getEventById(getState().events.eventDetails.eventId));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Już udostępniłeś to wydarzenie'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
