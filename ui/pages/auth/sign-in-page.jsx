import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUserId } from 'meteor/react-meteor-accounts';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../routes';
import { useLogin } from './hooks/use-login';

export default function SignInPage() {
  const userId = useUserId();
  const {
    loginOrCreateUser,
    showPassword,
    setShowPassword,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useLogin();

  if (userId) {
    return <Navigate to={routes.home} />;
  }

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #675AAA,#4399E1)"
            bgClip="text"
          >
            Sign in to your account
          </Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            to start admin your Tortilleria
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit(loginOrCreateUser)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  {...register('username')}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: 'blue.500' }}
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
