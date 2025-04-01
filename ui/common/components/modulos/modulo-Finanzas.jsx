import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { useUserPermissions } from './hooks/use-modulo';
import { useUserId } from 'meteor/react-meteor-accounts';

export function NavigationModuloFinanzas() {
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

    if (loading) return <div>Cargando permisos...</div>;
    if (error) return <div>Error: {error.message}</div>;

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const tieneAccesoFacturas = permisos["Facturas"] && (
    permisos["Facturas"]["Crear"] || permisos["Facturas"]["Actualizar"] || permisos["Facturas"]["Eliminar"] || permisos["Facturas"]["Consultar"]
  );

  const tieneAccesoCreditos = permisos["Créditos"] && (
    permisos["Créditos"]["Crear"] || permisos["Créditos"]["Actualizar"] || permisos["Créditos"]["Eliminar"] || permisos["Créditos"]["Consultar"]
  );

  if (!tieneAccesoFacturas && !tieneAccesoCreditos) {
    return null;
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton fontSize="sm" fontWeight={400} as={Button} onClick={handleMenuToggle}>
        Finanzas
      </MenuButton>
      <MenuList>
        {tieneAccesoFacturas && <MenuItem onClick={() => navigate('/factura-crud')}>Facturas</MenuItem>}
        {tieneAccesoCreditos && <MenuItem onClick={() => navigate('/credito-crud')}>Créditos</MenuItem>}
      </MenuList>
    </Menu>
  );
}
