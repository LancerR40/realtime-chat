export const contactVerify = (contacts, incomingUserId) => {
  const contactsLength = contacts.length;

  if (contactsLength < 1) {
    return false;
  }

  for (let i = 0; i < contactsLength; i++) {
    if (String(contacts[i]._id) === String(incomingUserId)) {
      return true;
    }
  }

  return false;
};

export const saveNewOutgoingUserContact = () => {};

export const saveNewIncomingUserContact = () => {};
