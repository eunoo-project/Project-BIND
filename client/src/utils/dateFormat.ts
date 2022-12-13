export const dateToString = (publishDate: Date) => {
  const now = new Date();
  const yesterday = new Date(now.setDate(now.getDate() - 1));
  const date = new Date(publishDate);

  if (yesterday > date)
    return date
      .toLocaleDateString()
      .replace(/\./g, (target, i) => (i === 4 ? '년' : i === 8 ? '월' : '일'));
  return date.toLocaleTimeString().substring(0, 7);
};
