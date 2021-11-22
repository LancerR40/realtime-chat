export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // prettier-ignore
  const hh = date.getHours() < 10 ? "0" + String(date.getHours()) : date.getHours();
  // prettier-ignore
  const mm = date.getMinutes() < 10 ? "0" + String(date.getMinutes()) : date.getMinutes();

  return hh >= 12 && hh <= 23 ? `${hh}:${mm}PM` : `${hh}:${mm}AM`;
};
