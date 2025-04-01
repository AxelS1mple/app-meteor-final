import { useToast } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Meteor } from "meteor/meteor";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { useState, useEffect } from "react";
import { useSubscribe } from 'meteor/react-meteor-data';
import { ProfilesCollection } from '../../../../api/users/profile'; 

export function useUserForm() {
  const toast = useToast();
  const [perfiles, setPerfiles] = useState([]);
  
  // Suscripción a los perfiles
  const perfilesReady = useSubscribe('profiles');
  
  useEffect(() => {
    if (perfilesReady()) {
      const perfilesData = ProfilesCollection.find().fetch();
      setPerfiles(perfilesData);
    }
  }, [perfilesReady]);

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    name: z.string().min(1, 'name is required'),
    lastNamePaternal: z.string().min(1, 'Paternal last name is required'),
    lastNameMaternal: z.string().min(1, 'Maternal last name is required'),
    birthDate: z.string().min(1, 'Birth date is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(1, 'Phone number is required'),
    gender: z.string().min(1, 'Gender is required'),
    status: z.string().min(1, 'Status is required'),
    idPerfil: z.string().min(1, 'Perfil is required'),
  });

  const { handleSubmit, register, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });

  async function saveUser(values) {
    const { username, name, lastNamePaternal, lastNameMaternal, birthDate, email, password, phone, gender, status, idPerfil } = values;

    try {
      await Meteor.callAsync('insertUser', { username, name, lastNamePaternal, lastNameMaternal, birthDate, email, password, phone, gender, status, idPerfil });
      reset();
      toast({
        title: 'Agregado.',
        description: 'El usuario se ha agregado exitosamente.',
        status: 'success',
      });
    } catch (err) {
      const reason = err?.reason || 'Surgió un error, por favor intenta de nuevo';
      toast({
        title: 'Ocurrió un error.',
        description: reason,
        status: 'error',
      });
    }
  }

  return {
    saveUser,
    register,
    formState,
    handleSubmit,
    perfiles,
  };
}
