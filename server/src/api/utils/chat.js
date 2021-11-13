export const contactVerify = (contacts, incomingUserId) => {
  const length = contacts.length;

  for (let i = 0; i < length; i++) {
    if (contacts[i]._id.toString() === incomingUserId.toString()) {
      return true;
    }
  }

  return false;
};
