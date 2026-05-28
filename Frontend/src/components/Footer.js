import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#2D4F2B',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    width: '100%',
    marginTop: 'auto',
  };

  return (
    <div style={footerStyle}>
      <p>Contact Us</p>
      <small>Phone: <PHONE> | Email: <EMAIL></small>
    </div>
  );
};

export default Footer;
