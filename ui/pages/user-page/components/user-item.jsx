import {
  Box,
  Button,
  Checkbox,
  HStack,
  Stack,
  Tooltip,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import React, { memo, useState, useEffect } from 'react';
import { useUserItem } from '../hooks/use-user-item';
import { ProfilesCollection } from '../../../../api/users/profile'; 

export const UserItem = memo(({ user }) => {
  const { onDelete, onUpdating } = useUserItem();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Obtener datos del usuario con valores por defecto
  const userName = user.profile?.name || user.username || 'No name';
  const userEmail = user.emails?.[0]?.address || 'No email';

  // Estados para actualizar el usuario
  const [newName, setNewName] = useState(userName);
  const [newEmail, setNewEmail] = useState(userEmail);
  const [newLastNamePaternal, setNewLastNamePaternal] = useState(user.profile?.lastNamePaternal || '');
  const [newLastNameMaternal, setNewLastNameMaternal] = useState(user.profile?.lastNameMaternal || '');
  const [newPhone, setNewPhone] = useState(user.profile?.phone || '');
  const [newStatus, setNewStatus] = useState(user.profile?.status || 'Active');
  const [newGender, setNewGender] = useState(user.profile?.gender || '');
  const [newDob, setNewDob] = useState(user.profile?.dob || '');
  const [newIdPerfil, setNewIdPerfil] = useState(user.profile?.idPerfil || '');
  const [perfilName, setPerfilName] = useState('');

  // Obtener el nombre del perfil basado en el idPerfil usando el método Meteor
  useEffect(() => {
    if (newIdPerfil) {
      // Verifica si el valor de newIdPerfil realmente ha cambiado
      if (newIdPerfil !== user.profile?.idPerfil) {
        Meteor.call('profiles.findName', newIdPerfil, (error, result) => {
          if (error) {
            console.error('Error al obtener el nombre del perfil:', error);
            setPerfilName('Error al obtener el perfil');
          } else {
            setPerfilName(result || 'No Perfil');
          }
        });
      }
    }
  }, [newIdPerfil]);

  const handleUpdate = () => {
    onUpdating(user._id, {
      name: newName.trim() || userName,
      lastNamePaternal: newLastNamePaternal.trim() || user.profile?.lastNamePaternal,
      lastNameMaternal: newLastNameMaternal.trim() || user.profile?.lastNameMaternal,
      email: newEmail.trim() || userEmail,
      phone: newPhone.trim() || user.profile?.phone,
      gender: newGender.trim() || user.profile?.gender,
      status: newStatus,
      dob: newDob,
      idPerfil: newIdPerfil,
    });
    onClose();
  };

  return (
    <HStack mt={4} p={3} borderWidth={1} borderRadius="md" width="100%">
      <Box flex="1">
        <Checkbox colorScheme="green">
          <Tooltip label={`Creado el ${new Date(user.createdAt).toLocaleString()}`} hasArrow>
            <span onClick={onOpen} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {userName}
            </span>
          </Tooltip>
        </Checkbox>
        <Text fontSize="sm">📧 Email: {userEmail}</Text>
        <Text fontSize="sm">📞 Teléfono: {newPhone || 'No phone'}</Text>
        <Text fontSize="sm">📅 Fecha de Nacimiento: {newDob ? new Date(newDob).toLocaleDateString() : 'No date'}</Text>
        <Text fontSize="sm">⚧ Género: {newGender || 'No especificado'}</Text>
        <Text fontSize="sm">🟢 Estado: {newStatus}</Text>
        <Text fontSize="sm">🟢 Perfil: {perfilName}</Text>
      </Box>

      <Stack justify="flex-end" direction="row">
        <Button colorScheme="yellow" variant="outline" size="xs" onClick={onOpen}>
          Editar
        </Button>
        <Button colorScheme="red" variant="outline" size="xs" onClick={() => onDelete(user._id)}>
          Eliminar
        </Button>
      </Stack>

      {/* Modal de edición */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Nombre</Text>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} />

            <Text fontWeight="bold">Apellido Paterno</Text>
            <Input value={newLastNamePaternal} onChange={(e) => setNewLastNamePaternal(e.target.value)} />

            <Text fontWeight="bold">Apellido Materno</Text>
            <Input value={newLastNameMaternal} onChange={(e) => setNewLastNameMaternal(e.target.value)} />

            <Text fontWeight="bold" mt={3}>Email</Text>
            <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

            <Text fontWeight="bold" mt={3}>Teléfono</Text>
            <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />

            <Text fontWeight="bold" mt={3}>Fecha de Nacimiento</Text>
            <Input type="date" value={newDob} onChange={(e) => setNewDob(e.target.value)} />

            <Text fontWeight="bold" mt={3}>Género</Text>
            <Select value={newGender} onChange={(e) => setNewGender(e.target.value)}>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </Select>

            <Text fontWeight="bold" mt={3}>Estado</Text>
            <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="Active">Activo</option>
              <option value="Inactive">Inactivo</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
});
