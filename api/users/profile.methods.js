import { ProfilesCollection } from "./profile";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


if (Meteor.isServer) {
  Meteor.publish("profiles", function () {
    return ProfilesCollection.find();
  }); 
}


Meteor.methods({
  async "profiles.insert"(nombre, permisos) { // <- Agregar 'async' aquí
    check(nombre, String);
    check(permisos, Object);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    try {
      await ProfilesCollection.insertAsync({
        nombre,
        permisos,
        createdAt: new Date(),
      });
    } catch (error) {
      throw new Meteor.Error("insert-failed", "Error al insertar el perfil", error);
    }
  },
});

Meteor.methods({
  async "profiles.delete"(profileId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    const perfil = await ProfilesCollection.findOneAsync(profileId);
    if (!perfil) {
      throw new Meteor.Error("perfil-not-found", "El perfil no fue encontrado");
    }
    await ProfilesCollection.removeAsync(profileId);
  },
});

Meteor.methods({
  async "profiles.findName"(profileId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    const perfil = await ProfilesCollection.findOneAsync(profileId);
    if (!perfil) {
      throw new Meteor.Error("perfil-not-found", "El perfil no fue encontrado");
    }
    return perfil.nombre || 'Nombre no disponible';
  },
});