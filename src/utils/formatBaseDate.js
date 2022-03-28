export const formatBaseDate = (date) => {
  let receivedDate = new Date(date);

  return [
    receivedDate.getDate().toString().padStart(2, '0'),
    (receivedDate.getMonth() + 1).toString().padStart(2, '0'),
    receivedDate.getFullYear(),
  ].join('.');
};
