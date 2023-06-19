import React from 'react';
import Menu from './Menu';
import '../styles.css';
import classNames from 'classnames';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <Menu />    
    <div className={classNames('window-top', className)}>{children}</div>
  </div>
);

export default Layout;
