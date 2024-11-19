// Import necessary hooks and components
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { firebaseController } from '../../utils/firebaseMiddleware'; // Adjust the path as necessary

// Define the type for archive data
interface addMapEntry {
  title: string;
  latitude: string;
  longitude: string;
  id: string; // Assuming you have an ID for each entry
  distance:string;
}

// ----------------------------------------------------------------------

export function MapForm() {
  const [title, setTitle] = useState(''); // State for title
  const [latitude, setLatitude] = useState(''); // State for latitude
  const [longitude, setLongitude] = useState(''); // State for longitude
  const [distance,setDistance]=useState('')
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !latitude || !longitude) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true); // Set loading state
    try {
      const docData = { title, latitude, longitude,distance };
      await firebaseController.addMapEntry(docData); // Use controller to add entry
      alert('Entry successfully added!');
      fetchArchiveData(); // Fetch data after adding
    } catch (error) {
      console.error('Error adding entry:', error);
      alert(`Error adding entry: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const fetchArchiveData = async () => {};

  useEffect(() => {
    fetchArchiveData(); // Fetch data on component mount
  }, []);


  const renderArchiveForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <TextField
        fullWidth
        name="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="latitude"
        label="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="longitude"
        label="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="distance"
        label="Distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        sx={{ mb: 3 }}
      />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={loading}
      >
        {loading ? 'Adding...' : 'Add Entry'}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Map Form
      </Typography>
      {renderArchiveForm}
    </>
  );
}
