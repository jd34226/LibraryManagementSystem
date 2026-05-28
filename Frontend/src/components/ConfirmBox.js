import React from 'react';

function ConfirmBox({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  };

  const boxStyle = {
    backgroundColor: '#FFF1CA',
    padding: '25px',
    borderRadius: '8px',
    width: '350px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    fontFamily: 'Urbanist, sans-serif'
  };


  const buttonStyle = {
    padding: '8px 16px',
    margin: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <p>{message}</p>
        <button
          style={{ ...buttonStyle, backgroundColor: '#d9534f', color: 'white' }}
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#ccc' }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmBox;
