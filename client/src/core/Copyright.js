import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import LocationOnSharp from '@material-ui/icons/LocationOnSharp';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import '../styles.css';


export default function Copyright() {
  return (
    <Box mt={8} mb={4} className='footer footer-font' align='center'>
      
      <div className='row'>
          <div className='col-md-4'>              
            <div className='typography'>
              <p className='top-border'>
                ABOUT
              </p>                  
              <p className='text-left-align'>
                Over a decade ago, we started a store to sell snowboards online. 
                None of the ecommerce solutions at the time gave us the control we needed to be successful—so we built our own. 
                Today, businesses of all sizes use Shopify, whether they’re selling online, in retail stores, or on-the-go.
              </p>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='typography'>
              <p className='top-border'>
                CONTACT
              </p>                  
              <div className='typography text-left-align'>
                  <div className='input-group input-group-lg top-border'>                   
                      <LocationOnSharp />                  
                      <Typography className='ml-3'>Berlin, German</Typography>                    
                  </div>
                  <div className='input-group input-group-lg top-border'>                   
                      <PhoneAndroid />                  
                      <Typography className='ml-3'>+ 49 08505 38 59 98</Typography>                    
                  </div>
                  <div className='input-group input-group-lg top-border'>                   
                      <EmailIcon />                  
                      <Typography className='ml-3'>e.commerce.shopify@shopify.com</Typography>                    
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='typography'>
                <p className='top-border'>
                  PARTNERS
                </p>                  
                <div className='typography text-left-align'>
                  <div className='input-group input-group-lg top-border'> 
                      <Typography className='ml-3'>Microsoft ( Microsoft.com )</Typography>                    
                  </div>
                  <div className='input-group input-group-lg top-border'> 
                      <Typography className='ml-3'>Google ( Google.com )</Typography>                    
                  </div>
                  <div className='input-group input-group-lg top-border'> 
                      <Typography className='ml-3'>Shopify ( Shopify.com )</Typography>                    
                  </div>
                  <div className='input-group input-group-lg top-border'> 
                      <Typography className='ml-3'>SuperPhantom ( SuperPhantom.com )</Typography>                    
                  </div>
                </div>
              </div>
          </div>
      </div>      
      <p>
        {'Copyright © '}
        <Link color='inherit' href='#'>
          E-Commerce
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}      
      </p>
    </Box>
  );
}
