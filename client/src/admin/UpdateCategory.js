import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: '',   
    loading: false,
    error: false,
    redirectToProfile: false,
    createdCategory: '',
    formData: '',
  });
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const {
    name,   
    loading,
    error,
    redirectToProfile,
    formData,
    createdCategory,
  } = values;

  const init = (categoryId) => {
    getCategory(categoryId).then((data) => {    
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,         
          formData: new FormData(),
        });       
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = (name) => (event) => {
    const value =  event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: '',           
            loading: false,
            error: false,
            redirectToProfile: true,
            createdCategory: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      <button className='btn btn-outline-primary'>Update Category</button>
      <Link to='/admin/category'  style={{marginLeft: '20px'}}>
        <button className='btn btn-outline-danger'>Back to Dashboard</button>        
      </Link>
    </form>
  );
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdCategory ? '' : 'none' }}
    >
      <h2>{`${createdCategory}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/admin/category' />;
      }
    }
  };

  return (
    <Layout
      title='Add a new Category'
      description={`G'day ${user.name}, ready to add a new Category?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
