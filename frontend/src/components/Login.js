// frontend/src/components/Login.js

import React, { useState, useContext } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NotificationContext } from '../NotificationContext';

import { Button, TextField, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import CustomButton from './CustomButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification('User logged in successfully', 'success');
    } catch (error) {
      console.error('Login error:', error);
      showNotification('Error logging in: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </CustomButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
