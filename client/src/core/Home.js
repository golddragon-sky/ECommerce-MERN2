import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const useStyles = makeStyles((theme) => ({
    homeImage: {
      width: '100%',
      height: '20%',
      align: 'center'
    },
  }));

  const classes = useStyles();

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if(data != undefined){
        if (data.error) {
          setError(data.error);
        } else {
          setProductsBySell(data);
        }
      }      
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if(data != undefined){
        if (data.error) {
          setError(data.error);
        } else {
          setProductsByArrival(data);
        }
      }     
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home page'
      description='Welcome to the world of fashion.'
      className='container-fluid'
    >
      <div  className={classes.homeImage}>
        <img
          src='/home.jpg'         
          className='mb-3'
          style={{ height: '100%', width: '100%', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </div>
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <h2 className='mb-2'>New Arrivals</h2>
          <div className='row'>
            {productsByArrival.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>
          <h2 className='mb-2 mt-4'>Best Sellers</h2>
          <div className='row'>
            {productsBySell.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>

      <Copyright />
    </Layout>
  );
};

export default Home;
