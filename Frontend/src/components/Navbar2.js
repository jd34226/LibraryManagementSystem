import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar2() {
  const navigate = useNavigate();

  const darkGreenStyle = {
    backgroundColor: '#2D4F2B',
    height: '20px',
  };

  const beigeStyle = {
    backgroundColor: '#FFF1CA',
    padding: '10px 0',
  };

  const iconStyle = {
    fontSize: '20px',
    color: '#2D4F2B',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#2D4F2B',
    textAlign: 'right',
  };

  return (
    <>
      <div style={darkGreenStyle} />
      <div style={beigeStyle}>
        <Container>
          <Row>
            <Col md={6}>
              <FaArrowLeft
                style={iconStyle}
                onClick={() => {
                  window.scrollTo(0, 0); // Scroll to top
                  navigate(-1);          // Navigate back
                }}
              />
            </Col>
            <Col md={6} style={titleStyle}>
              OnlineLibrarySystem
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Navbar2;
