export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)

  // prettier-ignore
  const hh = date.getHours() < 10 ? '0' + String(date.getHours()) : date.getHours();
  // prettier-ignore
  const mm = date.getMinutes() < 10 ? '0' + String(date.getMinutes()) : date.getMinutes();

  // prettier-ignore
  const day = date.getDate() < 10 ? '0' + String(date.getDate()) : date.getDate();

  // prettier-ignore
  const month = date.getMonth() + 1 < 10 ? '0' + String(date.getMonth() + 1) : date.getMonth() + 1;

  const year = date.getFullYear()

  // prettier-ignore
  return hh >= 12 && hh <= 23 ? `${day}/${month}/${year} ${hh}:${mm}PM` : `${day}/${month}/${year} ${hh}:${mm}AM`;
}
