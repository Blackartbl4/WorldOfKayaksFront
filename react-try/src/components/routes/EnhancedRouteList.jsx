import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Typography, TextField, Box, MenuItem, Pagination, CircularProgress, Alert } from '@mui/material';
import RouteCard from './RouteCard';
import { routeService } from '../../services/routeService';
import './StylesOverride.css'

/*const RouteList = () => {
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

export default RouteList;*/
///////////////////////////////////////////////////////////////////
const EnhancedRouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: '',
    duration: '',
    searchQuery: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1
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
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil((fetchedRoutes?.length || 0) / 9)
      }));
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
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
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
    <div style={{display: "block"}}>
    <Container className="container-overrides">{/**/}
      <Box sx={{ mb: 4 }} style={{alignContent: "center"}}>
        <Typography variant="h4" gutterBottom>
          Hiking Routes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {difficulties.map((diff, index) => (
                <MenuItem key={diff} value={index + 1}>
                  {diff}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Duration"
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {durations.map((dur, index) => (
                <MenuItem key={dur} value={index + 1}>
                  {dur}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {routes.length === 0 ? (
        <Typography variant="h6" align="center">
          No routes found
        </Typography>
      ) : (
        <Grid container spacing={5} justifyContent="space-around" style={{margin: 3, width: '90vw' }}>
                    {routes.map(route => (
                      <Grid item xs={12} sm={6} md={4} key={route.id}>
                        <RouteCard route={route} />
                      </Grid>
                    ))}
                  </Grid>
      )}

      {routes.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    {/*/div*/}
    </Container>
    </div>
  );
};

export default EnhancedRouteList;