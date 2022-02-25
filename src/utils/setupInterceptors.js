import {
  logoutUser,
  setTokenRefreshing,
  updateToken,
} from '../redux/actions/authActions';
import { showNotification } from '../redux/actions/notificationActions';
import { endpoints } from '../services/endpoints/endpoints';

const setup = (store) => {
  const { dispatch } = store;

  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, config] = args;
    let response;

    if (!resource.includes('/auth/')) {
      const loggedUser = JSON.parse(localStorage.getItem('state')).auth.user;
      const isUserRemember = JSON.parse(localStorage.getItem('state')).auth
        .remember;
      const refresh = JSON.parse(localStorage.getItem('state')).auth.user
        .refreshToken;

      const isTokenExpired =
        new Date() >
        new Date(
          new Date(loggedUser.accessTokenExpirationDate).getTime() - 5000
        );

      if (isTokenExpired && isUserRemember) {
        const refreshTokenResponse = await fetch(endpoints.refreshToken, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: refresh }),
        });

        const refreshTokenData = await refreshTokenResponse.json();

        await dispatch(
          updateToken(
            refreshTokenData.accessToken,
            refreshTokenData.accessTokenExpirationDate,
            refreshTokenData.refreshToken
          )
        );

        if (refreshTokenResponse.status === 410) {
          window.location.href = '/auth/login';
          dispatch(logoutUser(loggedUser.userId));
          dispatch(showNotification('error', 'Token odświeżania wygasł'));
        }

        const newAccessToken = refreshTokenData.accessToken;

        let newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: 'Bearer ' + newAccessToken,
          },
        };

        response = await originalFetch(resource, newConfig);
        return response;
      } else if (isTokenExpired && !isUserRemember) {
        response = await originalFetch(resource, config);
        dispatch(logoutUser(loggedUser.userId));
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Token dostępu wygasł'));
        return Promise.reject(response);
      } else {
        response = await originalFetch(resource, config);
        return response;
      }
    } else {
      response = await originalFetch(resource, config);
      return response;
    }
  };
};

export default setup;
