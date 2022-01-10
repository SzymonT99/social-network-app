export default function authorization() {
  let currentUser = JSON.parse(localStorage.getItem('state')).auth.user;

  if (currentUser && currentUser.accessToken) {
    return 'Bearer ' + currentUser.accessToken;
  } else {
    return '';
  }
}
