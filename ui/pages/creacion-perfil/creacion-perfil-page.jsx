import { useState } from "react";
import { Stack, Heading, Input, Checkbox, Button, VStack, Box } from "@chakra-ui/react";
import { Meteor } from "meteor/meteor";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useTracker } from "meteor/react-meteor-data";
import { ProfilesCollection } from "../../../api/users/profile";

export default function CreacionPerfiles() {
  const toast = useToast();
  const [nombrePerfil, setNombrePerfil] = useState("");
  const [permisos, setPermisos] = useState({
    consultar: false,
    insertar: false,
    actualizar: false,
    eliminar: false,
  });

  // Obtener los perfiles desde la base de datos
  const perfiles = useTracker(() => {
    Meteor.subscribe("profiles");
    return ProfilesCollection.find().fetch();
  });

  const handleCheckboxChange = (permiso) => {
    setPermisos({ ...permisos, [permiso]: !permisos[permiso] });
  };

  async function handleCrearPerfil() {
    if (nombrePerfil.trim() === "") return;
  
    try {
      await Meteor.callAsync("profiles.insert", nombrePerfil, permisos);
      setNombrePerfil("");
      setPermisos({ consultar: false, insertar: false, actualizar: false, eliminar: false });
      toast({
        title: 'Agregado.',
        description: 'Se ha agregado exitosamente.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Ocurrió un error.',
        description: ' ',
        status: 'error',
      });
      console.error("Error al crear el perfil:", error.reason);
    }
  }

  async function handleEliminarPerfil(profileId) {
    try {
      await Meteor.callAsync("profiles.delete", profileId);
      toast({
        title: 'Eliminado.',
        description: 'Se ha eliminado exitosamente.',
        status: 'success',
      });
    } catch (error) {
      console.error("Error al eliminar el perfil:", error.reason);
      toast({
        title: 'Ocurrió un error.',
        description: ' ',
        status: 'error',
      });
    }
  }

  return (
    <Stack spacing={6} p={6}>
      <Heading textAlign="center">Creación de Perfiles</Heading>
      <Input
        placeholder="Nombre del perfil"
        value={nombrePerfil}
        onChange={(e) => setNombrePerfil(e.target.value)}
      />
      <VStack align="start">
        {Object.keys(permisos).map((permiso) => (
          <Checkbox key={permiso} isChecked={permisos[permiso]} onChange={() => handleCheckboxChange(permiso)}>
            {permiso.charAt(0).toUpperCase() + permiso.slice(1)}
          </Checkbox>
        ))}
      </VStack>
      <Button colorScheme="blue" onClick={handleCrearPerfil}>Crear Perfil</Button>
      <VStack spacing={4} align="start">
        {perfiles.map((perfil) => (
          <Box key={perfil._id} p={4} borderWidth={1} borderRadius="md" w="100%">
            <Heading size="md">{perfil.nombre}</Heading>
            <VStack align="start" mt={2}>
              {Object.keys(perfil.permisos).map((permiso) =>
                perfil.permisos[permiso] ? <Box key={permiso}>{permiso}</Box> : null
              )}
            </VStack>
            <Button
              colorScheme="red"
              onClick={() => handleEliminarPerfil(perfil._id)}
              mt={2}
            >
              Eliminar Perfil
            </Button>
          </Box>
        ))}
      </VStack>
    </Stack>
  );
}
