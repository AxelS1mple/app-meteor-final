import React, { useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { FaBorderStyle } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUserId } from 'meteor/react-meteor-accounts';
import { useTracker } from 'meteor/react-meteor-data';

export function BottomNavigation() {
  const userId = useUserId();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Suscribirse a la publicación
  const { user, loading } = useTracker(() => {
    const handle = Meteor.subscribe('usersByLoggedUser');
    return {
      user: Meteor.user(), // Ahora realmente obtenemos el usuario
      loading: !handle.ready(),
    };
  });
  
  // Verificar si el usuario es "admin"
  const esAdmin = user?.username === "admin";
  
  // Si no es admin, ocultamos el menú
  if (!esAdmin) {
    return null;
  }  

  return (
    <>
      {userId && (
        <div>
          <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuButton fontSize="sm" fontWeight={400} as={Button} onClick={() => setIsOpen(!isOpen)}>
              Open Menu
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => alert('Sent mail')}>Sent mail</MenuItem>
              <MenuItem onClick={() => navigate('/asignar-modulos')}>
                <FaChalkboardTeacher style={{ marginRight: 8 }} />
                Asignar Módulo
              </MenuItem>
              <MenuItem onClick={() => navigate('/creacion-perfil')}>
                <FaBorderStyle style={{ marginRight: 8 }} />
                Crear perfil
              </MenuItem>
              <MenuItem onClick={() => navigate('/user-page')}>
                <FaUser style={{ marginRight: 8 }} />
                User
              </MenuItem>
              <MenuItem onClick={() => navigate('/dashboard')}>
                <FaUser style={{ marginRight: 8 }} />
                Panel de control
              </MenuItem>
              <MenuDivider />
            </MenuList>
          </Menu>
        </div>
      )}
    </>
  );
}
