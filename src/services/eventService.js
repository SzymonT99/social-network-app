import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createEvent = (formData) => {
  return fetch(endpoints.events, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editEvent = (eventId, formData) => {
  return fetch(endpoints.manageEvent.replace('{eventId}', eventId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteEvent = (eventId) => {
  return fetch(
    endpoints.manageEvent.replace('{eventId}', eventId) + '/archive',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getEvents = () => {
  return fetch(endpoints.events, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

export default {
  createEvent,
  editEvent,
  deleteEvent,
  getEvents,
};
