import React from 'react';
import logo from './assets/logoipsum-250.svg';

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Loading..." className="loading-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
