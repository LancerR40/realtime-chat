const base64ToFile = async (base64, filename = '') => {
  const response = await fetch(base64)
  const blob = await response.blob()

  return new File([blob], 'Avatar', { type: 'image/png' })
}

export default base64ToFile
