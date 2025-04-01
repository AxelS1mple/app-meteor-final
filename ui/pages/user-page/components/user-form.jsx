import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useUserForm } from '../hooks/use-user-form';

export function UserForm() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controlar el estado del modal
  const {
    saveUser,
    handleSubmit,
    register,
    perfiles,
    formState: { errors, isSubmitting },
  } = useUserForm();

  const onSaveUser = async (data) => {
    await saveUser(data);
    onClose();
  };

  return (
    <Box>
      {/* Botón para abrir el modal */}
      <Button
        onClick={onOpen}
        colorScheme="blue"
        mb={4}
      >
        Agregar Usuario
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSaveUser)}>

              {/* User Nombre */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.username}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="username"
                    {...register('username')}
                    placeholder="Nombre de usuario"
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>


              {/* Nombre */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="name"
                    {...register('name')}
                    placeholder="Nombre"
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Apellido Paterno */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.lastNamePaternal}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="lastNamePaternal"
                    {...register('lastNamePaternal')}
                    placeholder="Apellido Paterno"
                  />
                  <FormErrorMessage>{errors.lastNamePaternal?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Apellido Materno */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.lastNameMaternal}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="lastNameMaternal"
                    {...register('lastNameMaternal')}
                    placeholder="Apellido Materno"
                  />
                  <FormErrorMessage>{errors.lastNameMaternal?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Fecha de Nacimiento */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.birthDate}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="birthDate"
                    {...register('birthDate')}
                    type="date"
                    placeholder="Fecha de nacimiento"
                  />
                  <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Correo Electrónico */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.email}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Contraseña */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.password}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="password"
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Teléfono */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.phone}>
                  <Input
                    h="2.6rem"
                    pr="6rem"
                    id="phone"
                    {...register('phone')}
                    type="tel"
                    placeholder="Numero"
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Género */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.gender}>
                  <Select
                    id="gender"
                    {...register('gender')}
                    placeholder="Genero"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </Select>
                  <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              {/* Estado */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.status}>
                  <Select
                    id="status"
                    {...register('status')}
                    placeholder="Status"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>


              {/* idPerfil */}
              <InputGroup size="md" mb={4}>
                <FormControl isInvalid={!!errors.idPerfil}>
                  <Select
                    id="idPerfil"
                    {...register('idPerfil')}
                    placeholder="Asignar perfil"
                  >
                    {perfiles && Array.isArray(perfiles) && perfiles.length > 0 ? (
                      perfiles.map((perfil) => (
                        <option key={perfil._id} value={perfil._id}>
                          {perfil.nombre || 'Sin nombre'}
                        </option>
                      ))
                    ) : (
                      <option disabled>Cargando perfiles...</option>
                    )}
                  </Select>
                  <FormErrorMessage>{errors.idPerfil?.message}</FormErrorMessage>
                </FormControl>
              </InputGroup>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit(onSaveUser)}
              isLoading={isSubmitting}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
