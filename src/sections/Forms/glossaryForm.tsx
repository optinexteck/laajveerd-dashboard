// Import necessary hooks and components
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { firebaseController } from '../../utils/firebaseMiddleware'; // Adjust the path as necessary

// Define the type for glossary data
interface GlossaryEntry {
  title: string;
  description: string;
  id: string;
}

export function GlossaryForm() {
  const [title, setTitle] = useState(''); // State for title
  const [description, setDescription] = useState(''); // State for description
  const [glossaryData, setGlossaryData] = useState<GlossaryEntry[]>([]); // State for fetched data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    console.log(glossaryData);
    try {
      await firebaseController.addGlossaryEntry(title, description); // Use controller to add entry
      alert('Entry successfully added!');
      fetchGlossaryData(); // Fetch data after adding
    } catch (error) {
      alert(`Error adding entry: ${error.message}`);
    }
  };

  const fetchGlossaryData = async () => {
    try {
      const data = await firebaseController.getGlossaryEntries(); // Use controller to fetch entries
      setGlossaryData(data); // Set fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGlossaryData(); // Fetch data on component mount
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
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />
      <LoadingButton fullWidth size="large" type="submit" color="inherit" variant="contained">
        Add Entry
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Glossary Form
      </Typography>
      {renderArchiveForm}
      {/* Display fetched glossary data */}
    </>
  );
}
