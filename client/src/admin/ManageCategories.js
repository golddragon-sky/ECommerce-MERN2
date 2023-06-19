import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from './apiAdmin';
import { Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {    
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const useStyles = makeStyles((theme) => ({   
    deleteBtn: {
      color: '#ff6767',
      marginLeft: '10px'
    },
    table:{
        marginLeft: '50px',
        width:'30%'
    }
  }));
  const classes = useStyles();

  return (
    <Layout
      title='Manage Products'
      description='Perform CRUD on products'
      className={classes.table}
    >
     <Table>
      <TableHead>
        <TableRow className={classes.tableheader}>
          <TableCell>No</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {categories.map((p,i)=>(
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>
                <Link to={`/admin/category/update/${p._id}`}>
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

export default ManageCategories;
