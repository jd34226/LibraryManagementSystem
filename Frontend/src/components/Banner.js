import React from 'react';

function Banner({ text }) {
  const bannerStyle = {
    backgroundColor: '#2D4F2B',
    textAlign: 'center',
    padding: '40px 0',
    fontFamily: 'Urbanist, sans-serif',
  };

  const textStyle = {
    color: 'white',
    fontSize: '40px',
    margin: 0,
  };

  return (
    <div style={bannerStyle}>
      <h1 style={textStyle}>{text}</h1>
    </div>
  );
}

export default Banner;
