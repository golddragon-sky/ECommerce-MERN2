import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';
import { Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {    
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const useStyles = makeStyles((theme) => ({
    tableheader: {
      align: 'center', 
    },
    deleteBtn: {
      color: '#ff6767',
      marginLeft: '10px'
    }
  }));

  const classes = useStyles();

  return (
    <Layout
      title='Manage Products'
      description='Perform CRUD on products'
      className='container-fluid'
    >
     <Table>
      <TableHead>
        <TableRow className={classes.tableheader}>
          <TableCell>No</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Sell</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {products.map((p,i)=>(
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{p.category.name}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>{p.sold}</TableCell>
              <TableCell>
                <Link to={`/admin/product/update/${p._id}`}>
                  <EditIcon />
                </Link>
                <Link>
                  <DeleteIcon onClick={() => destroy(p._id)} className={classes.deleteBtn}/>
                </Link>
              </TableCell>
            </TableRow>
          ))}

      </TableBody>
     </Table>     
     <div style={{marginLeft: '20px', marginTop: '20px'}}>
     <Link to='/admin/dashboard' >
        <button className='btn btn-outline-danger'>Back to Dashboard</button>        
      </Link>
     </div>
    </Layout>
  );
};

export default ManageProducts;
