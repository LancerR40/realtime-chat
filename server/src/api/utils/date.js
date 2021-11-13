const currentTimestamp = () => {
  const date = new Date();

  const YY = date.getFullYear();
  // prettier-ignore
  const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1;
  // prettier-ignore
  const DD = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate();

  // prettier-ignore
  const HH = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours();
  // prettier-ignore
  const M = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes();
  // prettier-ignore
  const SS = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds();

  return `${YY}-${MM}-${DD} ${HH}:${M}:${SS}`;
};

console.log(currentTimestamp());
