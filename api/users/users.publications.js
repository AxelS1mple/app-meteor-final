import { Meteor } from 'meteor/meteor';

/**
 * Publicación que devuelve la lista de usuarios si el usuario actual está autenticado.
 */
Meteor.publish('usersByLoggedUser', function () {
  if (!this.userId) {
    return this.ready(); // Si no hay usuario autenticado, no devuelve datos
  }

  return Meteor.users.find({}, { 
    fields: { 
      username: 1, 
      emails: 1, 
      profile: 1, 
      createdAt: 1 
    } 
  });
});
