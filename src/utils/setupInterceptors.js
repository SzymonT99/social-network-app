import { logoutUser, updateToken } from '../redux/actions/authActions';
import { showNotification } from '../redux/actions/notificationActions';
import { endpoints } from '../services/endpoints/endpoints';

const setup = (store) => {
  const { dispatch } = store;

  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, config] = args;
    let response;

    const isPublicAccess = JSON.parse(localStorage.getItem('state')).auth
      .isGuest;

    if (!resource.includes('/auth/') && !isPublicAccess) {
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

      console.log(loggedUser.accessTokenExpirationDate);
      console.log(
        new Date() >
          new Date(
            new Date(loggedUser.accessTokenExpirationDate).getTime() - 5000
          )
      );
      console.log('isUserRemember: ' + isUserRemember);
      console.log('isTokenExpired: ' + isTokenExpired);

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
        if (response.status === 401) {
          // dispatch(logoutUser(loggedUser.userId));
          //  window.location.href = '/auth/login';
          dispatch(
            showNotification(
              'error',
              'Nie można odświeżyć tokenu - zalogowano się z innej przeglądarki'
            )
          );
          return Promise.reject(response);
        }
        return response;
      }
    } else if (isPublicAccess && !resource.includes('/auth/')) {
      response = await originalFetch(resource, config);
      if (response.status === 401) {
        dispatch(showNotification('warning', 'Brak dostępu'));
        return Promise.reject(response);
      } else {
        return response;
      }
    } else {
      response = await originalFetch(resource, config);
      return response;
    }
  };
};

export default setup;
