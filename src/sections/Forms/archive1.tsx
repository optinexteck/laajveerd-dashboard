// Import necessary hooks and components
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { firebaseController } from '../../utils/firebaseMiddleware'; // Adjust the path as necessary

export function ArchiveForm() {
  const [title, setTitle] = useState(''); // State for title
  const [location, setLocation] = useState(''); // State for location
  const [Year, setYear] = useState(''); // State for Year
  const [supportedBy, setSupportedBy] = useState('');
  const [team, setTeam] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [lead, setLead] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !location || !Year || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const docData = { title, location, Year: parseInt(Year,10), supportedBy, team, imageUrl, lead };
      await firebaseController.addArchive1Entry(docData);
      alert('Entry successfully added!');
      fetchArchiveData();
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
        name="location"
        label="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="Year"
        label="Year"
        value={Year}
        onChange={(e) => setYear(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="supportedBy"
        label="Supported By"
        value={supportedBy}
        onChange={(e) => setSupportedBy(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="projectlead"
        label="Project Lead"
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="team"
        label="Set Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="image"
        label="Enter Image Url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
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
        Archive Form
      </Typography>
      {renderArchiveForm}
    </>
  );
}
