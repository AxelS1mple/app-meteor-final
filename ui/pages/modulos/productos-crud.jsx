import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const ProductosCRUD = () => {
  const userId = Meteor.userId();
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Tortilla de Maíz', precio: 20, cantidad: 100 },
    { id: 2, nombre: 'Tortilla de Harina', precio: 25, cantidad: 200 },
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
  const permisosProductos = permissions.Productos || {};
  console.log("🔎 Permisos empleados:", permisosProductos); // Verifica en consola los permisos

  const canCrear = permisosProductos?.Crear || false;
  const canConsultar = permisosProductos?.Consultar || false;
  const canEditar = permisosProductos?.Actualizar || false;
  const canEliminar = permisosProductos?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo productos');
    } else {
      console.warn('⛔ No tiene permiso para crear productos.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar productos con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar productos.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar productos con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar productos.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      setEmpleados((prev) => prev.filter(item => item.id !== id));
      console.log(`✅ productos con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar productos.');
    }
  };


  return (
    <div>
      <h2>Productos</h2>
      {canCrear && (
      <Button onClick={handleCrear} isDisabled={!canCrear} colorScheme="green">Crear Producto</Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Cantidad</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((item) => (
            <Tr key={item.id}>
              <Td>{item.nombre}</Td>
              <Td>${item.precio}</Td>
              <Td>{item.cantidad}</Td>
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

export default ProductosCRUD;
