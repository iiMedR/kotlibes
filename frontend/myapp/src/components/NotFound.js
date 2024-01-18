import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: '#1e59fa',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '32px' }}>404 Not Found</h1>
      <p style={{ fontSize: '18px' }}>
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
