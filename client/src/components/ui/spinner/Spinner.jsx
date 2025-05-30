import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', margin: 'auto', flexDirection: 'column', textAlign: 'center' }} >
      <CircularProgress size={80} thickness={2.5}/>
      <p>Loading...</p>
    </Box>
  );
}
