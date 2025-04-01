export function useUserItem() {
    const onDelete = (userId) => {
      // Lógica para eliminar el usuario (puedes hacer una llamada a la API aquí)
      console.log('Deleting user:', userId);
    };
  
    const onMarkAsDone = (userId) => {
      // Lógica para marcar como "hecho" (puedes hacer una llamada a la API aquí)
      console.log('Marking user as done:', userId);
    };
  
    const onUpdating = (userId, newName) => {
      // Lógica para actualizar el usuario (puedes hacer una llamada a la API aquí)
      console.log('Updating user:', userId, newName);
    };
  
    return { onDelete, onMarkAsDone, onUpdating };
  }