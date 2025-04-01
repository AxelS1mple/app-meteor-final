import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useState } from 'react';

export function useUsers() {
  useSubscribe('usersByLoggedUser'); // Asegúrate de que esta suscripción esté correcta

  // Usamos useFind para obtener los usuarios
  const users = useFind(Meteor.users, [], []); // Si no hay usuarios, se devuelve un array vacío

  // Obtenemos el número total de usuarios y el número de usuarios pendientes
  const count = Array.isArray(users) ? users.length : 0; // Comprobamos que users es un array
  const pendingCount = Array.isArray(users) ? users.filter(user => !user.done).length : 0; // Filtramos los usuarios pendientes

  return {
    isLoading: false, // Puedes agregar la lógica de carga si es necesario
    users, // Los usuarios obtenidos
    count, // El total de usuarios
    pendingCount, // El número de usuarios pendientes
  };
}
