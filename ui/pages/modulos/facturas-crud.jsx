import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const FacturasCRUD = () => {
  const userId = Meteor.userId();
  const [facturas, setFacturas] = useState([
    { id: 1, descripcion: 'Factura 1', monto: 100, fecha: '2025-03-31' },
    { id: 2, descripcion: 'Factura 2', monto: 200, fecha: '2025-04-01' },
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
    const permisosFacturas = permissions.Facturas || {};
    console.log("🔎 Permisos facturas:", permisosFacturas); // Verifica en consola los permisos
  
    const canCrear = permisosFacturas?.Crear || false;
    const canConsultar = permisosFacturas?.Consultar || false;
    const canEditar = permisosFacturas?.Actualizar || false;
    const canEliminar = permisosFacturas?.Eliminar || false;

    const handleCrear = () => {
      if (canCrear) {
        console.log('✅ Crear nuevo registro de facturas');
      } else {
        console.warn('⛔ No tiene permiso para crear registros de facturas.');
      }
    };
  
    const handleConsultar = (id) => {
      if (canConsultar) {
        console.log(`✅ Consultar registro de facturas con ID: ${id}`);
      } else {
        console.warn('⛔ No tiene permiso para consultar registros de facturas.');
      }
    };
  
    const handleEditar = (id) => {
      if (canEditar) {
        console.log(`✅ Editar registro de facturas con ID: ${id}`);
      } else {
        console.warn('⛔ No tiene permiso para editar registros de facturas.');
      }
    };
  
    const handleEliminar = (id) => {
      if (canEliminar) {
        console.log(`✅ Registro de facturas con ID ${id} eliminado.`);
      } else {
        console.warn('⛔ No tiene permiso para eliminar registros de facturas.');
      }
    };

  return (
    <div>
      <h2>Facturas</h2>
      {canCrear && (
      <Button onClick={handleCrear} isDisabled={!canCrear} colorScheme="green">Crear Factura</Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Descripción</Th>
            <Th>Monto</Th>
            <Th>Fecha</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {facturas.map((factura) => (
            <Tr key={factura.id}>
              <Td>{factura.descripcion}</Td>
              <Td>${factura.monto}</Td>
              <Td>{factura.fecha}</Td>
              <Td>
                {canConsultar && (
                <Button 
                  onClick={() => handleConsultar(item.id)} 
                  colorScheme="blue" 
                  size="sm" 
                  isDisabled={!canConsultar}
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
                  isDisabled={!canEditar}
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
                  isDisabled={!canEliminar}
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

export default FacturasCRUD;
