import { useForm } from 'react-hook-form';

export function useUserForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const saveUser = (data) => {
    // Lógica para guardar el usuario (puedes hacer una llamada a la API aquí)
    console.log('Saving user:', data);
  };

  return {
    saveUser,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  };
}