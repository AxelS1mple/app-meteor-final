import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export function useUserPermissions(userId) {
  const [permisos, setPermisos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el usuario actual con useTracker
  const usuarioActual = useTracker(() => Meteor.user(), []);

  useEffect(() => {
    // Si no hay userId, intentamos obtenerlo del usuario actual
    const idUsuario = userId || usuarioActual?._id;
    
    if (!idUsuario) {
      setPermisos({});
      setLoading(false);
      return;
    }

    setLoading(true);
    Meteor.call("users.getPermissions", idUsuario, (err, res) => {
      if (err) {
        setError(err);
        setPermisos({});
      } else {
        console.log("Permisos cargados en el hook:", permisos);
        setPermisos(res || {});
      }
      setLoading(false);
    });
  }, [userId, usuarioActual]);

  return { permisos, loading, error };
}
