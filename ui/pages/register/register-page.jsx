import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountPage() {
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Create a New Account</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <form>
            <Stack spacing={4}>
              <FormControl>
                <Input
                  id="username"
                  placeholder="Enter a username"
                  autoComplete="username"
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  autoComplete="new-password"
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="green.600"
                  color="white"
                  _hover={{ bg: 'green.500' }}
                >
                  Create Account
                </Button>
                <Button onClick={() => navigate(-1)}>Back</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
