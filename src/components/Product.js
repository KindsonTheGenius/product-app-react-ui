import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Grid,
  CardHeader
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
        <CardHeader>
          Product Details
        </CardHeader>
        <CardContent>
          <Typography variant="h5" color="text.secondary" align="center">
            Product details are not available.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card sx={{ maxWidth: 900, margin: '30px auto', border: '3px solid #ccc' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {product.title} - {product.subCategory.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Category: {product.category.title} ({product.category.metaTitle})
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{fontWeight:'bold'}} variant="subtitle1" gutterBottom>
          Summary:
        </Typography>
        <Typography variant="body1">
          {product.summary}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{fontWeight:'bold'}} variant="subtitle1" gutterBottom>
          Content:
        </Typography>
        <Typography variant="body1">
          {product.content}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Updated At: {new Date(product.updatedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Link to="/products" size="small" color="primary">
          Back to List
        </Link>
      </CardActions>
    </Card>
  );
};

const Product = () => {

  const location = useLocation()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    setProduct(location.state.currentProduct)
  }, [location.state.currentProduct])

  return <ProductCard product={product} />;
};

export default Product;
