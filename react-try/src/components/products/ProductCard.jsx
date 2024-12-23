import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Paper, Button, Typography, Chip, Box, Modal, Fade } from '@mui/material';
import { cartService } from '../../services/cartService';
import { API_BASE_URL } from '../../services/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductDetails from './ProductDetails'

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const placeholderImage = `${API_BASE_URL}/img/default/product.jpg`;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product.id, 1);
      // Можно добавить уведомление об успешном добавлении
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
        <Card sx={{ textDecoration: 'none', height: 365, cursor: 'pointer'}} onClick={handleOpen}>
          <CardMedia
            component="img"
            height="200"
            image={imageError ? placeholderImage : `${API_BASE_URL}${product.imageURL}`}
            onError={handleImageError}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                ${product.price}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Box>
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
              <ProductDetails id={product.id}/>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>

  );
};

export default ProductCard;