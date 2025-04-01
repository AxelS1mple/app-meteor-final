import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { checkLoggedIn, checkUserOwner } from '../lib/auth';

/**
 * Inserta un nuevo usuario en Meteor.users.
 */
async function insertUser({
  username,
  name,
  email,
  password,
  lastNamePaternal,
  lastNameMaternal,
  birthDate,
  phone,
  gender,
  status,
  idPerfil
}) {
  check(username, String);
  check(name, String);
  check(email, String);
  check(password, String);
  check(lastNamePaternal, String);
  check(lastNameMaternal, String);
  check(birthDate, String);
  check(phone, String);
  check(gender, String);
  check(status, String);
  check(idPerfil, String);

  checkLoggedIn();

  try {
    console.log("Intentando crear usuario en Accounts:",   username,
        name,
        email,
        password,
        lastNamePaternal,
        lastNameMaternal,
        birthDate,
        phone,
        gender,
        status,
        idPerfil);

    // Verificar duplicados
    const existingUser = await Meteor.users.findOneAsync({
        $or: [{ username }, { 'emails.address': email }]
      });
  
      if (existingUser) {
        throw new Meteor.Error('username-email-exists', 'El nombre de usuario o el correo electrónico ya está en uso.');
      }

    const userId = await Accounts.createUserAsync({
      username,
      email,
      password,
      profile: {
        name,
        lastNamePaternal,
        lastNameMaternal,
        birthDate,
        phone,
        gender,
        status,
        idPerfil,
      },
    });

    console.log("Usuario insertado con éxito en Meteor.users:", userId);
    return userId;
  } catch (error) {
    console.error("Error al crear usuario en Accounts:", error);
    throw new Meteor.Error('insert-failed', 'Failed to create user', error);
  }
}

/**
 * Elimina un usuario de Meteor.users.
 */
async function removeUser({ userId }) {
  check(userId, String);

  const user = await Meteor.users.findOneAsync(userId);
  if (!user) {
    throw new Meteor.Error('user-not-found', 'User not found');
  }

  return await Meteor.users.removeAsync(userId);
}

/**
 * Cambia el estado 'done' en Meteor.users.
 */
async function toggleUserDone({ userId }) {
  check(userId, String);

  const user = await Meteor.users.findOneAsync(userId);
  if (!user) {
    throw new Meteor.Error('user-not-found', 'User not found');
  }

  return await Meteor.users.updateAsync(userId, { $set: { "profile.done": !user.profile?.done } });
}

/**
 * Edita un usuario en Meteor.users.
 */
async function updatingUser({
  userId,
  name,
  email,
  password,
  lastNamePaternal,
  lastNameMaternal,
  birthDate,
  phone,
  gender,
  status,
  idPerfil
}) {
  check(userId, String);
  check(name, String);
  check(email, String);
  check(lastNamePaternal, String);
  check(lastNameMaternal, String);
  check(birthDate, String);
  check(phone, String);
  check(gender, String);
  check(status, String);
  check(idPerfil, String);

  const user = await Meteor.users.findOneAsync(userId);
  if (!user) {
    throw new Meteor.Error('user-not-found', 'User not found');
  }

  const updateData = {
    "profile.name": name,
    "profile.lastNamePaternal": lastNamePaternal,
    "profile.lastNameMaternal": lastNameMaternal,
    "profile.birthDate": birthDate,
    "profile.phone": phone,
    "profile.gender": gender,
    "profile.status": status,
    "profile.idPerfil": idPerfil,
  };

  if (email) {
    updateData["emails.0.address"] = email; // Actualiza el email principal
  }

  // Si hay una nueva contraseña, la cambiamos
  if (password) {
    Accounts.setPassword(userId, password);
  }

  const result = await Meteor.users.updateAsync(userId, { $set: updateData });

  if (result === 0) {
    throw new Meteor.Error('update-failed', 'No documents were updated');
  }

  console.log('Update result:', result);
  return { success: true, message: 'User updated successfully', updatedCount: result };
}

Meteor.methods({
  insertUser,
  removeUser,
  toggleUserDone,
  updatingUser
});
