import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <section className='section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center'>
        <h1>404</h1>
        <h2>The page you are looking for doesn&#39;t exist.</h2>
        <Link to={'/'} className='btn'>
          Back to home
        </Link>
        <br />
        <div className='credits'>
          Designed by <a href='https://bootstrapmade.com/'>BootstrapMade</a>
        </div>
      </section>
    </>
  );
};
