// frontend/src/components/FileList.js

import React, { useContext, useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../AuthContext';
import { NotificationContext } from '../NotificationContext';
import axios from 'axios';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const FileList = ({ files, fetchFiles }) => {
  const { currentUser } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (fileId) => {
    if (!currentUser) {
      showNotification('Please log in to delete files.', 'warning');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    setLoading(true);
    try {
      const token = await currentUser.getIdToken();

      await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchFiles();
      showNotification('File deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      showNotification(
        'Error deleting file: ' + (error.response?.data || error.message),
        'error'
      );
    } finally {
      setLoading(false);
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
        Your Files
      </Typography>
      {loading ? (
        <CircularProgress style={{ color: '#ffeba7' }} />
      ) : files.length > 0 ? (
        <List>
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
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(file._id)}
                  style={{ color: '#ffeba7' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No files found.</Typography>
      )}
    </Paper>
  );
};

export default FileList;
