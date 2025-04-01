import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Checkbox, Select, Button, VStack, HStack, Text, useToast, Box, Divider } from "@chakra-ui/react";

const MODULOS = [
  "Facturas",
  "Créditos",
  "Productos",
  "Proveedores",
  "Clientes",
  "Pedidos",
  "Empleados",
  "Nómina",
];

const PERMISOS_TIPO = ["Crear", "Eliminar", "Consultar", "Actualizar"];

const AsignarModulo = () => {
  const toast = useToast();
  const [selectedUser, setSelectedUser] = useState("");
  const [permisos, setPermisos] = useState({});

  // Obtener la lista de usuarios
  const usuarios = useTracker(() => {
    const handle = Meteor.subscribe("allUsers");

    if (!handle.ready()) {
      console.log("Cargando usuarios...");
      return [];
    }

    const users = Meteor.users.find().fetch();
    console.log("Usuarios obtenidos:", users);
    return users;
  }, []);

  // Función para inicializar permisos con estructura correcta
  const inicializarPermisos = (permisosBD) => {
    let permisosEstandarizados = {};
    MODULOS.forEach((modulo) => {
      permisosEstandarizados[modulo] = PERMISOS_TIPO.reduce((acc, tipo) => {
        acc[tipo] = permisosBD?.[modulo]?.[tipo] || false;
        return acc;
      }, {});
    });
    return permisosEstandarizados;
  };

  // Cargar permisos si se selecciona un usuario
  useEffect(() => {
    if (selectedUser) {
      Meteor.call("users.getPermissions", selectedUser, (err, res) => {
        if (!err) {
          setPermisos(inicializarPermisos(res || {}));
        }
      });
    }
  }, [selectedUser]);

  // Manejar cambios en los checkboxes de permisos
  const handleCheckboxChange = (modulo, tipoPermiso) => {
    setPermisos((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [tipoPermiso]: !prev[modulo][tipoPermiso], // Alternar true/false
      },
    }));
  };

  // Guardar permisos en la base de datos
  const handleSave = () => {
    Meteor.call("users.setPermissions", selectedUser, permisos, (err) => {
      if (err) {
        toast({
          title: "Ocurrió un error.",
          description: "Error al actualizar permisos",
          status: "error",
        });
      } else {
        toast({
          title: "Actualizado.",
          description: "Permisos actualizados exitosamente.",
          status: "success",
        });
      }
    });
  };

  return (
    <VStack spacing={6} align="stretch" p={4} maxW="500px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Asignar Módulos
      </Text>

      {/* Selector de usuario */}
      <Select 
        placeholder="Selecciona un usuario" 
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        {usuarios.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </Select>

      {/* Si hay usuario seleccionado, mostrar los módulos */}
      {selectedUser && (
        <VStack align="stretch" spacing={4}>
          {MODULOS.map((modulo) => (
            <Box key={modulo} p={4} border="1px solid #ccc" borderRadius="md" w="100%">
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {modulo}
              </Text>
              <Divider mb={2} />

              {/* Lista de permisos */}
              <HStack spacing={4} flexWrap="wrap">
                {PERMISOS_TIPO.map((tipo) => (
                  <Checkbox
                    key={tipo}
                    isChecked={permisos[modulo]?.[tipo] || false}
                    onChange={() => handleCheckboxChange(modulo, tipo)}
                  >
                    {tipo}
                  </Checkbox>
                ))}
              </HStack>
            </Box>
          ))}

          {/* Botón de guardar */}
          <Button colorScheme="blue" size="lg" w="full" onClick={handleSave}>
            Guardar
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

export default AsignarModulo;
