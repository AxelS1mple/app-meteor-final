import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const ClientesCRUD = () => {
  const userId = Meteor.userId(); 
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Cliente A', direccion: 'Calle 123', telefono: '123456789' },
    { id: 2, nombre: 'Cliente B', direccion: 'Calle 456', telefono: '987654321' },
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
  const permisosClientes = permissions.Clientes || {};
  console.log("🔎 Permisos clientes:", permisosClientes); // Verifica en consola los permisos

  const canCrear = permisosClientes?.Crear || false;
  const canConsultar = permisosClientes?.Consultar || false;
  const canEditar = permisosClientes?.Actualizar || false;
  const canEliminar = permisosClientes?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo cliente');
    } else {
      console.warn('⛔ No tiene permiso para crear clientes.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar cliente con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar clientes.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar cliente con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar clientes.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ Cliente con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar clientes.');
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      {canCrear && (
        <Button onClick={handleCrear} colorScheme="green">Crear Cliente</Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Dirección</Th>
            <Th>Teléfono</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clientes.map((item) => (
            <Tr key={item.id}>
              <Td>{item.nombre}</Td>
              <Td>{item.direccion}</Td>
              <Td>{item.telefono}</Td>
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

export default ClientesCRUD;
