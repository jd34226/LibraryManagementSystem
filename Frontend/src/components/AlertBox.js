import React from 'react';

function AlertBox({ show, message, onClose, type = 'success' }) {
  if (!show) return null;

  const backgroundColor = type === 'success' ? '#708A58' : '#d9534f';

  const boxStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor,
    color: 'white',
    padding: '16px 24px',
    borderRadius: '6px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    zIndex: 9999,
    fontFamily: 'Urbanist, sans-serif',
    cursor: 'pointer',
    maxWidth: '80%',
    textAlign: 'center'
  };

  return (
    <div style={boxStyle} onClick={onClose}>
      {message}
    </div>
  );
}


export default AlertBox;
