import React from 'react';
import './Preloader.css';

const Preloader: React.FC = () => {
  return (
    <div id='preloader' className='preloader'>
      {/* Preloader content goes here */}
      <div className='animation-preloader'>
        <div className='spinner'></div>
      </div>
      <div className='loader'>{/* Loader content */}</div>
    </div>
  );
};

export default Preloader;
