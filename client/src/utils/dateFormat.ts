export const dateToString = (publishDate: Date) => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const date = new Date(publishDate);

  if (now > date)
    return date
      .toLocaleDateString()
      .replace(/\./g, (_, i) => (i === 4 ? '년' : i === 8 ? '월' : '일'));
  return date
    .toLocaleTimeString()
    .substring(0, date.toLocaleTimeString().lastIndexOf(':'))
    .replace(/[1-9]{,2}/g, target => {
      return Number(target) < 10 ? '0' + target : target;
    });
};

export const dateToTime = (chatDate: Date) => {
  const date = new Date(chatDate);
  return date
    .toLocaleTimeString()
    .substring(0, date.toLocaleTimeString().lastIndexOf(':'))
    .replace(/[1-9]{,2}/g, target => {
      return Number(target) < 10 ? '0' + target : target;
    });
};

export const dateToDate = (chatDate: Date) => {
  const date = new Date(chatDate);
  return date
    .toLocaleDateString()
    .replace(/\./g, (_, i) => (i === 4 ? '년' : i === 8 ? '월' : '일'));
};
