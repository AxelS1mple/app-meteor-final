import { Mongo } from 'meteor/mongo';

// Crear la colección de módulos
export const Modules = new Mongo.Collection('modules');

// Solo ejecutar en el lado del servidor
if (Meteor.isServer) {
  Meteor.startup(() => {
    // Verificar si la colección está vacía
    if (Modules.find().count() === 0) {
      const modulesData = [
        { name: 'Finanzas', submodules: ['Facturas', 'Creditos'] },
        { name: 'Inventario', submodules: ['Productos', 'Proveedores'] },
        { name: 'Ventas', submodules: ['Clientes', 'Pedidos'] },
        { name: 'RRHH', submodules: ['Empleados', 'Nómina'] }
      ];

      // Insertar los datos si la colección está vacía
      modulesData.forEach(module => {
        Modules.insert(module);
      });

      console.log('Módulos insertados en la colección');
    } else {
      console.log('Los módulos ya existen en la base de datos');
    }
  });
}
