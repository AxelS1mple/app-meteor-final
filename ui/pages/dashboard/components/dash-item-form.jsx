import React, { memo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Tooltip,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useUserItem } from '../hooks/dash-use-item';

export const UserItem = memo(({ user }) => {
  const { onDelete, onMarkAsDone, onUpdating } = useUserItem();
  const [newName, setNewName] = useState(user.name);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = () => {
    onUpdating(user._id, newName); // Llama a la función para actualizar el usuario
    onClose(); // Cierra el modal después de actualizar
  };

  return (
    <HStack mt={4}>
      <Box w="60%">
        <Checkbox
          colorScheme="green"
          isChecked={user.done}
          onChange={() => onMarkAsDone(user._id)}
        >
          <Tooltip label={`Added on ${new Date(user.createdAt).toLocaleString()}`} hasArrow>
            <span onClick={onOpen}>{user.name}</span>
          </Tooltip>
        </Checkbox>
      </Box>
      <Box w="40%" textAlign="right">
        <Button
          colorScheme="red"
          variant="outline"
          size="xs"
          onClick={() => onDelete(user._id)}
          mr={2}
        >
          Remove
        </Button>
        <Button
          colorScheme="yellow"
          variant="outline"
          size="xs"
          onClick={onOpen}
        >
          Update
        </Button>
      </Box>

      {/* Modal para editar el nombre del usuario */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              size="md"
              placeholder="Enter new name"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
});