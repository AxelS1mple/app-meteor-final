import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
  } from "@chakra-ui/react";
  import React from "react";
  import { useUserForm } from '../hooks/use-user-form';
  
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
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <Input
                h="2.6rem"
                id="name"
                {...register('name')}
                placeholder="Enter user name"
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl isInvalid={!!errors.email}>
              <Input
                h="2.6rem"
                id="email"
                {...register('email')}
                placeholder="Enter email"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl isInvalid={!!errors.password}>
              <Input
                h="2.6rem"
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter password"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl isInvalid={!!errors.role}>
              <Input
                h="2.6rem"
                id="role"
                {...register('role')}
                placeholder="Enter role"
              />
              <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
            </FormControl>
  
            <InputGroup size="md">
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
          </Stack>
        </form>
      </Box>
    );
  }