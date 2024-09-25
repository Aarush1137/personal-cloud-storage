// frontend/src/App.js

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import AuthCard from './components/AuthCard'; 
import Logout from './components/Logout';
import FileUpload from './components/FileUpload';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import axios from 'axios';

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Logo from './assets/logo.png';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

  // Memoized fetchFiles function
  const fetchFiles = useCallback(async () => {
    if (!currentUser) {
      setFiles([]);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const res = await axios.get('http://localhost:5000/api/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(res.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="App">
      <AppBar position="static" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
            <Typography variant="h6" style={{ color: '#ffeba7' }}>
              Personal Cloud Storage
            </Typography>
          </Box>
          {currentUser && <Logout />}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        {!currentUser && <AuthCard />}
        {currentUser && (
          <>
            <Typography variant="h5" style={{ color: '#ffeba7' }}>
              Welcome, {currentUser.email}
            </Typography>
            <FileUpload fetchFiles={fetchFiles} />
            <FileSearch />
            <FileList files={files} fetchFiles={fetchFiles} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
