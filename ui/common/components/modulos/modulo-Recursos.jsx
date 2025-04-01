import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { useUserPermissions } from './hooks/use-modulo';
import { useUserId } from 'meteor/react-meteor-accounts';

export function NavigationModuloRecursos() {
  const userId = useUserId();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [permisosCargados, setPermisosCargados] = useState(null);


  const user = useTracker(() => Meteor.user());
  const { permisos, loading, error } = useUserPermissions(user?._id);

  useEffect(() => {
    if (!loading && permisos) {
      setPermisosCargados(permisos);
    }
  }, [loading, permisos]);

  console.log("Permisos cargados en el modulo:", permisosCargados);

  if (loading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const tieneAccesoEmpleados = permisosCargados?.["Empleados"] && (
    permisosCargados["Empleados"]["Crear"] ||
    permisosCargados["Empleados"]["Actualizar"] ||
    permisosCargados["Empleados"]["Eliminar"] ||
    permisosCargados["Empleados"]["Consultar"]
  );

  const tieneAccesoNomina = permisosCargados?.["Nómina"] && (
    permisosCargados["Nómina"]["Crear"] ||
    permisosCargados["Nómina"]["Actualizar"] ||
    permisosCargados["Nómina"]["Eliminar"] ||
    permisosCargados["Nómina"]["Consultar"]
  );

  if (!tieneAccesoEmpleados && !tieneAccesoNomina) {
    return null;
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton fontSize="sm" fontWeight={400} as={Button} onClick={handleMenuToggle}>
        Recursos
      </MenuButton>
      <MenuList>
        {tieneAccesoEmpleados && <MenuItem onClick={() => navigate('/empleado-crud')}>Empleados</MenuItem>}
        {tieneAccesoNomina && <MenuItem onClick={() => navigate('/nomina-crud')}>Nómina</MenuItem>}
      </MenuList>
    </Menu>
  );
}
