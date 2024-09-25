// frontend/src/components/Logout.js

import React, { useContext } from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { NotificationContext } from '../NotificationContext';

import { Button } from '@mui/material';

const Logout = () => {
  const { showNotification } = useContext(NotificationContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('User logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Error logging out: ' + error.message, 'error');
    }
  };

  return (
    <Button
      onClick={handleLogout}
      style={{
        backgroundColor: '#ffeba7',
        color: '#000',
        marginLeft: 'auto',
        marginRight: '1rem',
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
