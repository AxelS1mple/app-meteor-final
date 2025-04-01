import React from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from './hooks/dash-use-user';
import { UserForm } from './components/dash-user-form';
import { UserItem } from './components/dash-item-form';

export default function Dashboard() {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  if (loading) return <Spinner />;
  if (error) return <div>Error loading users</div>;

  return (
    <Box p={4}>
      <Heading mb={4}>User Dashboard</Heading>
      <Button colorScheme="blue" onClick={() => navigate('/create-account')} mb={4}>
        Create New Account
      </Button>

      {/* Formulario para agregar nuevos usuarios */}
      <UserForm />

      {/* Tabla para mostrar los usuarios */}
      <Box
        mt={8}
        py={4}
        px={4}
        border={1}
        borderStyle="solid"
        borderRadius="md"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <UserItem key={user._id} user={user} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}