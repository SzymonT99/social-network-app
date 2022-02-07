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

export const editEvent = (eventId, formData) => (dispatch) => {
  return eventService
    .editEvent(eventId, formData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getEvents());
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
        dispatch(showNotification('success', 'Usunięto powydarzenie'));
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
