import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { useUserPermissions } from './hooks/use-modulo';
import { useUserId } from 'meteor/react-meteor-accounts';

export function NavigationModuloVentas() {
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

  const tieneAccesoPedidos = permisos["Pedidos"] && (
    permisos["Pedidos"]["Crear"] || permisos["Pedidos"]["Actualizar"] || permisos["Pedidos"]["Eliminar"] || permisos["Pedidos"]["Consultar"]
  );

  const tieneAccesoClientes = permisos["Clientes"] && (
    permisos["Clientes"]["Crear"] || permisos["Clientes"]["Actualizar"] || permisos["Clientes"]["Eliminar"] || permisos["Clientes"]["Consultar"]
  );

  if (!tieneAccesoPedidos && !tieneAccesoClientes) {
    return null;
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton fontSize="sm" fontWeight={400} as={Button} onClick={handleMenuToggle}>
        Ventas
      </MenuButton>
      <MenuList>
        {tieneAccesoPedidos && <MenuItem onClick={() => navigate('/pedido-crud')}>Pedidos</MenuItem>}
        {tieneAccesoClientes && <MenuItem onClick={() => navigate('/cliente-crud')}>Clientes</MenuItem>}
      </MenuList>
    </Menu>
  );
}
