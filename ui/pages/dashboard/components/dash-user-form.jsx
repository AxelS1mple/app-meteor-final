import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useUserForm } from '../hooks/dash-use-form';

export function UserForm() {
  const {
    saveUser,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useUserForm();

  return (
    <Box>
      <form onSubmit={handleSubmit(saveUser)}>
        <InputGroup size="md">
          <FormControl isInvalid={!!errors.name}>
            <Input
              h="2.6rem"
              pr="6rem"
              id="name"
              {...register('name')}
              placeholder="Type a new user"
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <InputRightElement width="6rem">
            <Button
              h="2.5rem"
              size="sm"
              bg="blue.600"
              color="white"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Add User
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
}