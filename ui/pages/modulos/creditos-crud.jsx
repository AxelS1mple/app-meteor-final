import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const CreditosCRUD = () => {
  const userId = Meteor.userId();
  const [creditos, setCreditos] = useState([
    { id: 1, cliente: 'Cliente A', monto: 500, fecha: '2025-03-31' },
    { id: 2, cliente: 'Cliente B', monto: 300, fecha: '2025-04-01' },
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
  const permisosCreditos = permissions.Créditos || {};
  console.log("🔎 Permisos créditos:", permisosCreditos); // Verifica en consola los permisos

  const canCrear = permisosCreditos?.Crear || false;
  const canConsultar = permisosCreditos?.Consultar || false;
  const canEditar = permisosCreditos?.Actualizar || false;
  const canEliminar = permisosCreditos?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo registro de crédito');
    } else {
      console.warn('⛔ No tiene permiso para crear registros de crédito.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar registro de crédito con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar registros de crédito.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar registro de crédito con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar registros de crédito.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ Registro de crédito con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar registros de crédito.');
    }
  };

  return (
    <div>
      <h2>Créditos</h2>
      {canCrear && (
        <Button onClick={handleCrear} colorScheme="green">Crear Crédito</Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Monto</Th>
            <Th>Fecha</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {creditos.map((item) => (
            <Tr key={item.id}>
              <Td>{item.cliente}</Td>
              <Td>${item.monto}</Td>
              <Td>{item.fecha}</Td>
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

export default CreditosCRUD;
