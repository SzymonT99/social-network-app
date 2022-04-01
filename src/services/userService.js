import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const getUserProfile = (userId) => {
  return fetch(endpoints.userProfile.replace('{userId}', userId), {
    method: 'GET',
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
    body: JSON.stringify(workPlace),
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

const getUserFavourites = (userId) => {
  return fetch(endpoints.userFavouriteItems.replace('{userId}', userId), {
    method: 'GET',
  });
};

const addUserFavourite = (favouriteItem) => {
  return fetch(endpoints.addFavouriteItem, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(favouriteItem),
  });
};

const editUserFavourite = (favouriteId, updatedFavouriteItem) => {
  return fetch(
    endpoints.manageFavouriteItem.replace('{favouriteId}', favouriteId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(updatedFavouriteItem),
    }
  );
};

const deleteUserFavourite = (favouriteId) => {
  return fetch(
    endpoints.manageFavouriteItem.replace('{favouriteId}', favouriteId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getPossibleInterests = () => {
  return fetch(endpoints.possibleInterest, {
    method: 'GET',
  });
};

const getUserInterests = (userId) => {
  return fetch(endpoints.userInterests.replace('{userId}', userId), {
    method: 'GET',
  });
};

const addUserInterests = (userId, interestId) => {
  return fetch(
    endpoints.manageUserInterests
      .replace('{userId}', userId)
      .replace('{interestId}', interestId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const deleteUserInterests = (userId, interestId) => {
  return fetch(
    endpoints.manageUserInterests
      .replace('{userId}', userId)
      .replace('{interestId}', interestId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const addProfilePhoto = (photo, userId) => {
  return fetch(endpoints.manageProfilePhoto.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: photo,
  });
};

const deleteProfilePhoto = (userId) => {
  return fetch(endpoints.manageProfilePhoto.replace('{userId}', userId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUserImages = (userId) => {
  return fetch(endpoints.profileImages.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const editProfileInformation = (userId, updatedProfile) => {
  return fetch(endpoints.profileInformation.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(updatedProfile),
  });
};

const addUserAddress = (address) => {
  return fetch(endpoints.addAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(address),
  });
};

const editUserAddress = (addressId, address) => {
  return fetch(endpoints.updateAddress.replace('{addressId}', addressId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(address),
  });
};

const changeUserStatus = (status) => {
  return fetch(
    endpoints.changeStatus +
      '?' +
      new URLSearchParams({
        activityStatus: status,
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

const getAllUserAccounts = (page, size) => {
  return fetch(
    endpoints.userAccountsForAdmin +
      '?' +
      new URLSearchParams({
        page: page,
        size: size,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const manageUserAccountByAdmin = (userId, userAccount) => {
  return fetch(endpoints.manageUserAccountByAdmin.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(userAccount),
  });
};

const deleteUserByAdmin = (userId) => {
  return fetch(endpoints.manageUserAccountByAdmin.replace('{userId}', userId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
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
  getUserFavourites,
  addUserFavourite,
  editUserFavourite,
  deleteUserFavourite,
  getPossibleInterests,
  getUserInterests,
  addUserInterests,
  deleteUserInterests,
  addProfilePhoto,
  deleteProfilePhoto,
  getUserImages,
  editProfileInformation,
  addUserAddress,
  editUserAddress,
  changeUserStatus,
  getAllUserAccounts,
  manageUserAccountByAdmin,
  deleteUserByAdmin,
};
