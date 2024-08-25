import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products() {

    const [products, setProducts] = useState(null)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [newProduct, setNewProduct] = useState({
      id: '',
      name: '',
      description: '',
      brand: '',
      acquisitionDate: '',
      price: '',
    });
  
    const [editProduct, setEditProduct] = useState({
        id: null,
        name: '',
        description: '',
        brand: '',
        acquisitionDate: '',
        price: '',
    });

    const handleClickOpenEdit = (product) => {
        setEditProduct(product);
        setOpenEdit(true);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  
    const handleChange = (e) => {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleChangeEdit = (e) => {
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    };
  
    const handleAddProduct = async () => {
        try {
          const response = await axios.post('http://localhost:8080/products', {
            ...newProduct,
            price: parseFloat(newProduct.price), // Ensure the price is a number
          });
          setProducts([...products, response.data]); // Add the new product to the list
          setNewProduct({
            name: '',
            description: '',
            brand: '',
            acquisitionDate: '',
            price: '',
          });
          handleClose();
        } catch (error) {
          console.error('There was an error adding the product!', error);
        }
    };

    const handleEditProduct = async () => {
        try {
          const response = await axios.put(`http://localhost:8080/product/${editProduct.id}`, {
            ...editProduct,
            price: parseFloat(editProduct.price), // Ensure the price is a number
          });
          setProducts(products.map(product => 
            product.id === editProduct.id ? response.data : product
          )); // Update the product in the list
          handleCloseEdit();
        } catch (error) {
          console.error('Error updating the product:', error);
          alert('There was an error updating the product! Please try again.');
        }
    };
    
    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/product/${id}`);
        setProducts(products.filter(product => product.id !== id)); // Remove the deleted product from the list
        handleConfirmClose();
    } catch (error) {
        console.error('Error deleting the product:', error);
        alert('There was an error deleting the product! Please try again.');
    }
    };
    
    const handleConfirmOpen = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setDeleteId(null);
        setConfirmOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/products')
        .then(response => {
            setProducts(response.data)
        });
    }, [])

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <TableContainer component={Paper} style={{width: '70%'}}>
    <Box 
        display="flex" 
        justifyContent="flex-start" 
        width="70%" 
        mb={2}
      >
        <Button variant="contained" onClick={handleClickOpen}>Add New</Button>
    </Box>    
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Acquisition Date</TableCell>
          <TableCell align="right">Price ($)</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { products !== null? products.map((product, index) => (
            <TableRow 
            key={product.id}
            style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}  // Striped effect
          >
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.acquisitionDate}</TableCell>
            <TableCell align="right">{product.price.toFixed(2)}</TableCell>
            <TableCell align="center">
              <IconButton color="primary" onClick={() => handleClickOpenEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleConfirmOpen(product.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )) :( <div>Loading...</div>)
        }
      </TableBody>
    </Table>
  </TableContainer>

      {/* Modal Dialog for Adding New Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={newProduct.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={newProduct.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="acquisitionDate"
            label="Acquisition Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newProduct.acquisitionDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>


      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteId);
            }}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    {/* Modal Dialog for Editing Product */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={editProduct.name}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editProduct.description}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={editProduct.brand}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="acquisitionDate"
            label="Acquisition Date"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
              value={editProduct.acquisitionDate}
              onChange={handleChangeEdit}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={editProduct.price}
              onChange={handleChangeEdit}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditProduct} color="primary" variant="contained">
              Update Product
            </Button>
          </DialogActions>
        </Dialog>  
        </Box>
  )
}
