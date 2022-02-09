import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createEvent = (formData) => {
  return fetch(endpoints.events, {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editEvent = (eventId, formData) => {
  return fetch(endpoints.manageEvent.replace('{eventId}', eventId), {
    method: 'PUT',
    headers: {
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

const respondToEvent = (eventId, reaction) => {
  return fetch(
    endpoints.eventReaction.replace('{eventId}', eventId) +
      '?' +
      new URLSearchParams({
        reaction: reaction,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getEventInvitations = () => {
  return fetch(endpoints.getUserEventInvitations, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const shareEvent = (eventId) => {
  return fetch(endpoints.shareEvent.replace('{eventId}', eventId), {
    method: 'POST',
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
  respondToEvent,
  getEventInvitations,
  shareEvent,
};
