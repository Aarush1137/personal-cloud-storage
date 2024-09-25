// frontend/src/components/AuthCard.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { NotificationContext } from '../NotificationContext';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useSpring, animated } from '@react-spring/web';
import {
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email,
  Lock,
} from '@mui/icons-material';

import './AuthCard.css'; // We'll create this CSS file

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      showNotification('Logged in successfully', 'success');
    } catch (error) {
      console.error('Login error:', error);
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      showNotification('Registered successfully', 'success');
    } catch (error) {
      console.error('Signup error:', error);
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="auth-container">
      <div className="card-wrapper">
        {/* Front Side (Login) */}
        <animated.div
          className="card-side"
          style={{
            opacity: opacity.to((o) => 1 - o),
            transform,
            zIndex: isFlipped ? 1 : 2,
          }}
        >
          <Paper className="card">
            <Typography variant="h4" className="card-title">
              Log In
            </Typography>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={loginData.email}
              onChange={handleLoginChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: '#ffeba7' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={handleLoginChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: '#ffeba7' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              className="card-button"
            >
              {loading ? 'Logging In...' : 'Login'}
            </Button>
            <Typography className="card-footer">
              Don't have an account?{' '}
              <Button onClick={handleFlip} className="card-link">
                Sign Up
              </Button>
            </Typography>
          </Paper>
        </animated.div>

        {/* Back Side (Sign Up) */}
        <animated.div
          className="card-side"
          style={{
            opacity,
            transform,
            rotateY: '180deg',
            zIndex: isFlipped ? 2 : 1,
          }}
        >
          <Paper className="card">
            <Typography variant="h4" className="card-title">
              Sign Up
            </Typography>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={signupData.email}
              onChange={handleSignupChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: '#ffeba7' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.password}
              onChange={handleSignupChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: '#ffeba7' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleSignup}
              disabled={loading}
              className="card-button"
            >
              {loading ? 'Signing Up...' : 'Register'}
            </Button>
            <Typography className="card-footer">
              Already have an account?{' '}
              <Button onClick={handleFlip} className="card-link">
                Log In
              </Button>
            </Typography>
          </Paper>
        </animated.div>
      </div>
    </div>
  );
};

export default AuthCard;
