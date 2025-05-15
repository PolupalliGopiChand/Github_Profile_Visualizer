import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notFound__container">
      <h1 className="notFound__title">404 - Page Not Found</h1>
      <p className="notFound__message">
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
