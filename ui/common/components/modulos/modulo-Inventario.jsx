import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { useUserPermissions } from './hooks/use-modulo';
import { useUserId } from 'meteor/react-meteor-accounts';

export function NavigationModuloInventario() {
  const userId = useUserId();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user = useTracker(() => Meteor.user());
  const { permisos, loading, error } = useUserPermissions(user?._id);

  if (loading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const tieneAccesoProductos = permisos["Productos"] && (
    permisos["Productos"]["Crear"] || permisos["Productos"]["Actualizar"] || permisos["Productos"]["Eliminar"] || permisos["Productos"]["Consultar"]
  );

  const tieneAccesoProveedores = permisos["Proveedores"] && (
    permisos["Proveedores"]["Crear"] || permisos["Proveedores"]["Actualizar"] || permisos["Proveedores"]["Eliminar"] || permisos["Proveedores"]["Consultar"]
  );

  if (!tieneAccesoProductos && !tieneAccesoProveedores) {
    return null;
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton fontSize="sm" fontWeight={400} as={Button} onClick={handleMenuToggle}>
        Inventario
      </MenuButton>
      <MenuList>
        {tieneAccesoProductos && <MenuItem onClick={() => navigate('/producto-crud')}>Productos</MenuItem>}
        {tieneAccesoProveedores && <MenuItem onClick={() => navigate('/proveedor-crud')}>Proveedores</MenuItem>}
      </MenuList>
    </Menu>
  );
}
