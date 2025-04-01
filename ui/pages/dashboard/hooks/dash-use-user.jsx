import { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos Meteor.call para llamar a un método del servidor
    Meteor.call('getUsers', (err, result) => {
      if (err) {
        console.error('Error fetching users:', err);
        console.error('Error denro del if');
        setError(err);
        setLoading(false);
      } else {
        setUsers(result);
        setLoading(false);
        console.error(result);
      }
    });
  }, []);

  return { users, loading, error };
}