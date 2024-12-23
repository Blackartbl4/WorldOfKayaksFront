import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import ProductCard from './ProductCard';
import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAllProducts();
        console.log('Fetched products:', fetchedProducts);
        
        // Ensure we have an array
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <Grid Grid container spacing={5} justifyContent="space-around" style={{margin: 3, width: '90vw' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
  );
};

export default ProductList;