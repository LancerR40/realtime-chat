export const imageToBase64 = (img) =>
  `data:image/png;base64,${Buffer.from(img.data).toString('base64')}`;
