import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const PedidosCRUD = () => {
  const userId = Meteor.userId();
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: 'Cliente A', producto: 'Tortillas', cantidad: 100, fecha: '2025-03-31' },
    { id: 2, cliente: 'Cliente B', producto: 'Tortillas', cantidad: 150, fecha: '2025-04-01' },
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
  const permisosPedidos = permissions.Pedidos || {};
  console.log("🔎 Permisos empleados:", permisosPedidos); // Verifica en consola los permisos

  const canCrear = permisosPedidos?.Crear || false;
  const canConsultar = permisosPedidos?.Consultar || false;
  const canEditar = permisosPedidos?.Actualizar || false;
  const canEliminar = permisosPedidos?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo pedidos');
    } else {
      console.warn('⛔ No tiene permiso para crear pedidos.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar pedidos con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar pedidos.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar pedidos con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar pedidos.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ pedidos con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar pedidos.');
    }
  };

  return (
    <div>
      <h2>Pedidos</h2>
      {canCrear && (
      <Button onClick={handleCrear} isDisabled={!canCrear} colorScheme="green">Crear Pedido</Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pedidos.map((item) => (
            <Tr key={item.id}>
              <Td>{item.cliente}</Td>
              <Td>{item.producto}</Td>
              <Td>{item.cantidad}</Td>
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

export default PedidosCRUD;
