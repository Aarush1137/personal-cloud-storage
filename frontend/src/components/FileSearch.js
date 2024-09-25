// frontend/src/components/FileSearch.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { NotificationContext } from '../NotificationContext';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';

const FileSearch = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!currentUser) {
      showNotification('Please log in to search files.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const token = await currentUser.getIdToken();

      const res = await axios.get(
        `http://localhost:5000/api/files/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFiles(res.data);
    } catch (error) {
      console.error('Error searching files:', error);
      showNotification(
        'Error searching files: ' + (error.response?.data || error.message),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    try {
      const fileRef = ref(storage, file.filename);
      const url = await getDownloadURL(fileRef);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error getting file download URL:', error);
      showNotification('Error downloading file: ' + error.message, 'error');
    }
  };

  return (
    <Paper
      style={{
        padding: '2rem',
        marginTop: '2rem',
        backgroundColor: '#2b2e38',
        color: '#ffeba7',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Search Files
      </Typography>
      <TextField
        label="Search files..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '1rem', backgroundColor: '#1f2029' }}
        InputProps={{
          style: { color: '#ffeba7' },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#ffeba7' }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: { color: '#ffeba7' },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        startIcon={
          loading ? (
            <CircularProgress size={24} style={{ color: '#000' }} />
          ) : (
            <SearchIcon />
          )
        }
        disabled={loading}
        style={{
          backgroundColor: '#ffeba7',
          color: '#000',
        }}
      >
        Search
      </Button>

      {files.length > 0 && (
        <List style={{ marginTop: '1rem' }}>
          {files.map((file) => (
            <ListItem key={file._id}>
              <ListItemText
                primary={file.originalname}
                style={{ color: '#ffeba7' }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleFileClick(file)}
                  style={{ color: '#ffeba7' }}
                >
                  <CloudDownloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FileSearch;
