import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const ProveedoresCRUD = () => {
  const userId = Meteor.userId();
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: 'Proveedor A', direccion: 'Calle 123', telefono: '123456789' },
    { id: 2, nombre: 'Proveedor B', direccion: 'Calle 456', telefono: '987654321' },
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
  const permisosProveedores = permissions.Proveedores || {};
  console.log("🔎 Permisos empleados:", permisosProveedores); // Verifica en consola los permisos

  const canCrear = permisosProveedores?.Crear || false;
  const canConsultar = permisosProveedores?.Consultar || false;
  const canEditar = permisosProveedores?.Actualizar || false;
  const canEliminar = permisosProveedores?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo proveedores');
    } else {
      console.warn('⛔ No tiene permiso para crear proveedores.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar proveedores con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar proveedores.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar proveedores con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar proveedores.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ proveedores con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar proveedores.');
    }
  };

  return (
    <div>
      <h2>Proveedores</h2>
      {canCrear && (
      <Button onClick={handleCrear} isDisabled={!canCrear} colorScheme="green">Crear Proveedor</Button>
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
          {proveedores.map((item) => (
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

export default ProveedoresCRUD;
