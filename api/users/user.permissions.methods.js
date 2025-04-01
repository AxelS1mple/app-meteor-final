  import { Meteor } from "meteor/meteor";
  import { check } from "meteor/check";

  Meteor.methods({
    async "users.getPermissions"(userId) {
      check(userId, String);

      const user = await Meteor.users.findOneAsync(userId);
      
      if (!user) {
        throw new Meteor.Error('user-not-found', 'El usuario no fue encontrado.');
      }

      const permisos = user.permissions || {};  // Si no tiene permisos, devolvemos un objeto vacío.

      if (Object.keys(permisos).length === 0) {
        // Devolver un objeto vacío o valores falsos si no tiene permisos
        return {
          'Nómina': false,
          'Empleados': false,
          'Pedidos': false,
          'Clientes': false,
          'Proveedores': false,
          'Productos': false,
          'Créditos': false,
          'Facturas': false,
        };
      }

      console.log('Permisos del usuario desde el back', permisos);
      return permisos;
    },

    async "users.setPermissions"(userId, permisos) {
      check(userId, String);
      check(permisos, Object);

      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }

      await Meteor.users.updateAsync(userId, { $set: { permissions: permisos } });
      console.log('Permisos del usuario desde el back en setPermiss',permisos);
    },
  });
