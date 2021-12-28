export const imageToBase64 = async (base64) => {
  const response = await fetch(base64);
  const blob = await response.blob();

  return new File([blob], 'Avatar', { type: 'image/png' });
};
