import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('isContact:true', async (data, User) => {
  const { newMsg, outgoingUser, incomingUser } = data;
  const { outgoingUserId, incomingUserId } = newMsg;

  let index = outgoingUser.contacts.findIndex(
    (contact) => String(contact._id) === String(incomingUserId)
  );

  outgoingUser.contacts[index].chat.push(newMsg);

  index = incomingUser.contacts.findIndex(
    (contact) => String(contact._id) === String(outgoingUserId)
  );

  incomingUser.contacts[index].chat.push(newMsg);

  const saveOutgoingUser = new User(outgoingUser);
  await saveOutgoingUser.save();

  const saveIncomingUser = new User(incomingUser);
  await saveIncomingUser.save();
});

myEmitter.on('isContact:false', async (data, User) => {
  const { newMsg, outgoingUser, incomingUser } = data;
  const { outgoingUserId, incomingUserId } = newMsg;

  const { fullname: iF, email: iE, avatar: iA } = incomingUser;
  const { fullname: oF, email: oE, avatar: oA } = outgoingUser;

  let newContact = {};

  newContact._id = incomingUserId;
  newContact.fullname = iF;
  newContact.email = iE;
  newContact.avatar = iA;
  newContact.chat = [newMsg];

  outgoingUser.contacts.push(newContact);

  // Save new contact in outgoing user
  const saveOutgoingUser = new User(outgoingUser);
  await saveOutgoingUser.save();

  newContact._id = outgoingUserId;
  newContact.fullname = oF;
  newContact.email = oE;
  newContact.avatar = oA;

  incomingUser.contacts.push(newContact);

  // Save new contact in outgoing user
  const saveIncomingUser = new User(incomingUser);
  await saveIncomingUser.save();
});

export default myEmitter;
