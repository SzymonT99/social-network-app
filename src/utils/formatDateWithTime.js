export const formatDateWithTime = (date, withSeconds = false) => {
  let receivedDate = new Date(date);

  let result =
    receivedDate.getDate().toString().padStart(2, '0') +
    '.' +
    (receivedDate.getMonth() + 1).toString().padStart(2, '0') +
    '.' +
    receivedDate.getFullYear() +
    ' ' +
    receivedDate.getHours().toString().padStart(2, '0') +
    ':' +
    receivedDate.getMinutes().toString().padStart(2, '0');

  if (withSeconds) {
    result =
      result + ':' + receivedDate.getSeconds().toString().padStart(2, '0');
  }

  return result;
};
