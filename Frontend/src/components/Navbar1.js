import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHome, FaBook, FaFileInvoice, FaUserFriends, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmBox from './ConfirmBox';

function Navbar1() {

  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOutClick = (e) => {
    e.preventDefault(); // prevent immediate navigation
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate('/'); // redirect to sign-in or landing page
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const darkGreenStyle = {
    backgroundColor: '#2D4F2B',
    height: '20px',
  };

  const beigeStyle = {
    backgroundColor: '#FFF1CA',
    padding: '10px 0',
  };

  const iconStyle = {
    fontSize: '24px',
    color: '#2D4F2B',
  };

  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start', // Align icons to the left
    alignItems: 'center',
    gap: '20px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#2D4F2B',
    display: 'flex',
    justifyContent: 'flex-end', // Align text to the right
    alignItems: 'center',
    height: '100%',
  };

  return (
    <>
      <div style={darkGreenStyle} />
      <div style={beigeStyle}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div style={iconContainerStyle}>
                <Link to="/home" style={linkStyle}>
                  <FaHome style={iconStyle} />
                </Link>
                <Link to="/books" style={linkStyle}>
                  <FaBook style={iconStyle} />
                </Link>
                <Link to="/transaction" style={linkStyle}>
                  <FaFileInvoice style={iconStyle} />
                </Link>
                <Link to="/members" style={linkStyle}>
                  <FaUserFriends style={iconStyle} />
                </Link>
                <Link to="/" onClick={handleSignOutClick} style={linkStyle}>
                  <FaSignInAlt style={iconStyle} />
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div style={titleStyle}>
                OnlineLibrarySystem
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ConfirmBox
        show={showConfirm}
        message="Are you sure you want to exit?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default Navbar1;
