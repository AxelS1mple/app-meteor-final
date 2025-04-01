import { useToast } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Meteor } from "meteor/meteor";
import { useForm } from "react-hook-form";
import * as z from 'zod';

export function useRegisterForm() {
  const toast = useToast();
  const schema = z.object({
    name: z.string().min(1, 'User name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string().min(1, 'Role is required'),
  });

  const { handleSubmit, register, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });

  async function saveUser(values) {
    const { name, email, password, role } = values;
    try {
      await Meteor.callAsync('insertUser', { name, email, password, role });
      reset();
    } catch (err) {
      const reason = err?.reason || 'An error occurred, please try again';
      toast({
        title: 'Error',
        description: reason,
        status: 'error'
      });
    }
  }

  return {
    saveUser,
    register,
    formState,
    handleSubmit,
  };
}