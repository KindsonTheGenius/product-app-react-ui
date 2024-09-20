import React from 'react'
import {Typography, Container, Box } from '@mui/material';

export default function RegistrationSuccess() {
  return (
    <Container maxWidth="xs">
    <Box sx={{ mt: 8, color: 'green' }}>
      <Typography variant="h3" align="center" gutterBottom>
        You have successfully Registered. You can now Login
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        <a href="#">You can now Login</a>
      </Typography>
    </Box>
    </Container>

  )
}