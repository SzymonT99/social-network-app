import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const getUserProfile = (userId) => {
  return fetch(endpoints.userProfile.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUserActivity = (userId) => {
  return fetch(endpoints.userActivity.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const addSchoolInformation = (school) => {
  return fetch(endpoints.addSchoolInformation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(school),
  });
};

const editSchoolInformation = (schoolId, updatedSchool) => {
  return fetch(
    endpoints.manageSchoolInformation.replace('{schoolId}', schoolId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(updatedSchool),
    }
  );
};

const deleteSchoolInformation = (schoolId) => {
  return fetch(
    endpoints.manageSchoolInformation.replace('{schoolId}', schoolId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const addWorkPlaceInformation = (workPlace) => {
  return fetch(endpoints.addWorkPlaceInformation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ workPlace }),
  });
};

const editWorkPlaceInformation = (workId, updatedWorkPlace) => {
  return fetch(
    endpoints.manageWorkPlaceInformation.replace('{workId}', workId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(updatedWorkPlace),
    }
  );
};

const deleteWorkPlaceInformation = (workId) => {
  return fetch(
    endpoints.manageWorkPlaceInformation.replace('{workId}', workId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

export default {
  getUserProfile,
  getUserActivity,
  addSchoolInformation,
  editSchoolInformation,
  deleteSchoolInformation,
  addWorkPlaceInformation,
  editWorkPlaceInformation,
  deleteWorkPlaceInformation,
};
