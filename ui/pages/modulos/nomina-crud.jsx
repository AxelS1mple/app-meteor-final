import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const NominaCRUD = () => {
  const userId = Meteor.userId(); // Obtén el userId del usuario logueado
  const [nomina, setNomina] = useState([
    { id: 1, empleado: 'Juan Pérez', salario: 12000 },
    { id: 2, empleado: 'Ana López', salario: 10000 },
  ]);

  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    if (userId) {
      console.log('📡 Solicitando permisos para el usuario:', userId);
      Meteor.call('users.getPermissions', userId, (error, result) => {
        if (error) {
          console.error('⛔ Error al obtener permisos:', error);
        } else {
          console.log('✅ Permisos obtenidos:', result);
          setPermissions(result || {}); // Asegurar que siempre sea un objeto
        }
      });
    }
  }, [userId]);

  if (!permissions) {
    return <div>Cargando permisos...</div>; // Evitar que la UI se renderice sin permisos cargados
  }

  // Verificar permisos para cada acción
  const permisosNomina = permissions.Nómina || {};
  console.log("🔎 Permisos nómina:", permisosNomina);

  const canCrear = permisosNomina?.Crear || false;
  const canConsultar = permisosNomina?.Consultar || false;
  const canEditar = permisosNomina?.Actualizar || false;
  const canEliminar = permisosNomina?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo registro de nómina');
    } else {
      console.warn('⛔ No tiene permiso para crear registros de nómina.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar registro de nómina con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar registros de nómina.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar registro de nómina con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar registros de nómina.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ Registro de nómina con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar registros de nómina.');
    }
  };

  return (
    <div>
      <h2>Nómina</h2>
      {canCrear && (
        <Button onClick={handleCrear} colorScheme="green">
          Crear Nomina
        </Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Empleado</Th>
            <Th>Salario</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {nomina.map((item) => (
            <Tr key={item.id}>
              <Td>{item.empleado}</Td>
              <Td>${item.salario}</Td>
              <Td>
                {canConsultar && (
                  <Button 
                    onClick={() => handleConsultar(item.id)} 
                    colorScheme="blue" 
                    size="sm"
                  >
                    Consultar
                  </Button>
                )}
                {canEditar && (
                  <Button 
                    onClick={() => handleEditar(item.id)} 
                    colorScheme="yellow" 
                    size="sm" 
                    ml={2}
                  >
                    Editar
                  </Button>
                )}
                {canEliminar && (
                  <Button 
                    onClick={() => handleEliminar(item.id)} 
                    colorScheme="red" 
                    size="sm" 
                    ml={2}
                  >
                    Eliminar
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default NominaCRUD;
