import React, { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

const EmpleadosCRUD = () => {
  const userId = Meteor.userId(); // Obtén el userId del usuario logueado
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Juan Pérez', puesto: 'Cocinero', salario: 12000 },
    { id: 2, nombre: 'Ana López', puesto: 'Vendedora', salario: 10000 },
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
  const permisosEmpleados = permissions.Empleados || {};
  console.log("🔎 Permisos empleados:", permisosEmpleados); // Verifica en consola los permisos

  const canCrear = permisosEmpleados?.Crear || false;
  const canConsultar = permisosEmpleados?.Consultar || false;
  const canEditar = permisosEmpleados?.Actualizar || false;
  const canEliminar = permisosEmpleados?.Eliminar || false;

  const handleCrear = () => {
    if (canCrear) {
      console.log('✅ Crear nuevo empleado');
    } else {
      console.warn('⛔ No tiene permiso para crear empleados.');
    }
  };

  const handleConsultar = (id) => {
    if (canConsultar) {
      console.log(`✅ Consultar empleado con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para consultar empleados.');
    }
  };

  const handleEditar = (id) => {
    if (canEditar) {
      console.log(`✅ Editar empleado con ID: ${id}`);
    } else {
      console.warn('⛔ No tiene permiso para editar empleados.');
    }
  };

  const handleEliminar = (id) => {
    if (canEliminar) {
      console.log(`✅ Empleado con ID ${id} eliminado.`);
    } else {
      console.warn('⛔ No tiene permiso para eliminar empleados.');
    }
  };

  return (
    <div>
      <h2>Empleados</h2>
      {canCrear && (
        <Button onClick={handleCrear} colorScheme="green">
          Crear Empleado
        </Button>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Puesto</Th>
            <Th>Salario</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {empleados.map((item) => (
            <Tr key={item.id}>
              <Td>{item.nombre}</Td>
              <Td>{item.puesto}</Td>
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

export default EmpleadosCRUD;
