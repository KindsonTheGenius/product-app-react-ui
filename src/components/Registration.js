import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Typography,
    Button,
    Box,
    Container,
    Grid,
    TextField,
    Card,
    CardHeader,
    CardContent
  } from '@mui/material';

export default function Registration() {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('')

        try {
            const response = await axios.post('http://localhost:8080/register', formData);

            if(response.status === 201) {
                navigate('/registrationSuccess')
            } else {
                const errorText = await response.text();
                setError(errorText)
            }
        } catch(err) {
            setError('An error occured during user registration')
        }

    }

  return (
    <Card sx={{ maxWidth: 700, margin: '30px auto', border: '3px solid #356' }}>
    <CardHeader>
      Login
    </CardHeader>
    <CardContent>
    <Container maxWidth="xs">
    <Box sx={{ mt: 0}}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstname"
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastname"
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  </Container>
  </CardContent>
  </Card>
  )
}
