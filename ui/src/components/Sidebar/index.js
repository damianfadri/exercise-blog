import React from 'react';
import styles from 'components/Sidebar/Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={ styles.sidebar + ' px-0 col-12 col-md-3 col-lg-2'}>
      <div className="mb-5" />
      <div className={ styles.sidebarBody }>
        <ul className={ styles.sidebarNav }>
          <li 
            className={ styles.sidebarNavItem}>
              <Link 
                className={ isActive('/blog/write') ? styles.sidebarNavItemActive : '' } 
                to="/blog/write">
                  <i className={ 'fa fa-file ' + styles.sidebarNavItemIcon }></i>
                  <span>Write New Post</span>
              </Link>
          </li>
          <li className={ styles.sidebarNavItem}>
            <Link 
              className={ isActive('/blog') ? styles.sidebarNavItemActive : '' } 
              to="/blog">
                <i className={ 'fa fa-list ' + styles.sidebarNavItemIcon }></i>
                View Posts
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;