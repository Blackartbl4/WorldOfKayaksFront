import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Paper, Button, Typography, Chip, Box, Modal, Fade } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_BASE_URL } from '../../services/api';
import { formatDuration, formatPoints } from '../../utils/formatters';
import RouteDetails from './RouteDetails'

const RouteCard = ({ route }) => {
  const [open, setOpen] = useState(false);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${API_BASE_URL}/img/default/route.jpg`;
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${API_BASE_URL}${path}`;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        paper: '#1A1818',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Card sx={{ textDecoration: 'none' , height: 365, cursor: 'pointer'}} onClick={handleOpen}>
          <CardMedia
            component="img"
            height="200"
            image={getImageUrl(route.imageUrl)}
            alt={route.riverName}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {route.riverName}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {route.description}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
              <Chip label={`Difficulty: ${route.difficulty}`} color="primary" />
              <Chip label={`Duration: ${formatDuration(route.duration)}`} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Route: {formatPoints(route.points)}
            </Typography>
          </CardContent>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: '90%',
                maxWidth: '800px',
                maxHeight: '600px',
                overflowY: 'auto'
              }}
            >
              <RouteDetails id={route.id}/>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default RouteCard;
