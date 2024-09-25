// frontend/src/components/FileUpload.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { NotificationContext } from '../NotificationContext';

import {
  Button,
  Typography,
  Paper,
  Input,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ fetchFiles }) => {
  const [fileData, setFileData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!fileData) {
      showNotification('Please select a file first!', 'warning');
      return;
    }

    if (!currentUser) {
      showNotification('Please log in to upload files.', 'warning');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', fileData);

    try {
      const token = await currentUser.getIdToken();

      await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      showNotification('File uploaded successfully', 'success');
      setFileData(null); // Reset the file input
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Upload error:', error);
      showNotification(
        'Error uploading file: ' + (error.response?.data || error.message),
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
        Upload a File
      </Typography>
      <div style={{ marginTop: '1rem' }}>
        <Input
          accept="*/*"
          id="upload-file"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            style={{
              backgroundColor: '#ffeba7',
              color: '#000',
              marginRight: '1rem',
            }}
          >
            Choose File
          </Button>
        </label>
        {fileData && (
          <Typography
            variant="body1"
            style={{ display: 'inline', color: '#ffeba7' }}
          >
            {fileData.name}
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        onClick={handleFileUpload}
        style={{
          marginTop: '1rem',
          backgroundColor: '#ffeba7',
          color: '#000',
        }}
        disabled={!fileData || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </Paper>
  );
};

export default FileUpload;
