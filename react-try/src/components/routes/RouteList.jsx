import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Typography, TextField, Box, MenuItem, Pagination, CircularProgress, Alert } from '@mui/material';
import RouteCard from './RouteCard';
import { routeService } from '../../services/routeService';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: '',
    duration: '',
    searchQuery: ''
  });


  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
  const durations = ['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours']

  const fetchRoutes = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedRoutes = await routeService.getAllRoutes(
        filters.difficulty ? parseInt(filters.difficulty) : null,
        filters.duration ? parseInt(filters.duration) : null
      );

      console.log('Fetched routes:', fetchedRoutes);

      // Ensure we have an array
      setRoutes(Array.isArray(fetchedRoutes) ? fetchedRoutes : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setError('Failed to load routes');
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };



  if (loading) return (
    <Container>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

    return (
        <>
          <Grid container spacing={5} justifyContent="space-around" style={{margin: 3, width: '90vw' }}>
            {routes.map(route => (
              <Grid item xs={12} sm={6} md={4} key={route.id}>
                <RouteCard route={route} />
              </Grid>
            ))}
          </Grid>


    </>
    );
  };

export default RouteList;