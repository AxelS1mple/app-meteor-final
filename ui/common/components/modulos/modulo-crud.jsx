import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import { useUserPermissions } from './hooks/use-modulo';
import { useUserId } from 'meteor/react-meteor-accounts';

export default function ModuloCrud() {
  const { modulo } = useParams(); // Captura el módulo desde la URL
  const userId = useUserId();

  const { permisos, loading, error } = useUserPermissions(userId);

  if (loading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Permisos del usuario:', permisos);

  // Verifica si el usuario tiene permisos en el módulo seleccionado
  const checkPermission = (action) => {
    // Asegúrate de que `modulo` esté definido
    const modulePermissions = permisos[modulo];
    if (!modulePermissions) return false;

    // Si el permiso es un objeto, buscamos la acción específica
    if (typeof modulePermissions === 'object') {
      return modulePermissions[action] === true;
    }

    // Si el permiso es un booleano, simplemente devolvemos el valor
    return modulePermissions === true;
  };

  return (
    <Stack textAlign="center" spacing={8} py={10}>
      <Heading fontWeight={600}>
        <Text as="span" bgGradient="linear(to-l, #675AAA, #4399E1)" bgClip="text">
          Permisos - {modulo}
        </Text>
      </Heading>

      {/* Botones dinámicos según permisos */}
      {checkPermission("Crear") && (
        <Button mt={4} colorScheme="teal">
          Crear
        </Button>
      )}

      {checkPermission("Actualizar") && (
        <Button mt={4} colorScheme="yellow">
          Actualizar
        </Button>
      )}

      {checkPermission("Eliminar") && (
        <Button mt={4} colorScheme="red">
          Eliminar
        </Button>
      )}

      {checkPermission("Consultar") && (
        <Button mt={4} colorScheme="blue">
          Consultar
        </Button>
      )}
    </Stack>
  );
}
