import eventService from '../../services/eventService';
import eventTypes from '../types/eventTypes';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

export const createEvent = (eventFormData) => (dispatch) => {
  return eventService
    .createEvent(eventFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getEvents());
        dispatch(showNotification('success', 'Utworzono wydarzenie'));
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
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

export const respondToEvent = (eventId, reaction) => (dispatch, getState) => {
  return eventService
    .respondToEvent(eventId, reaction)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getEvents());
        dispatch(getEventById(getState().events.eventDetails.eventId));
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
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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

export const shareEvent = (eventId) => (dispatch, getState) => {
  return eventService
    .shareEvent(eventId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getEventById(getState().events.eventDetails.eventId));
        dispatch(showNotification('success', 'Udostępniono wydarzenie'));
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
