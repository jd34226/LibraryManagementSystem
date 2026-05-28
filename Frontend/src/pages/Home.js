import React from 'react';
import Navbar1 from '../components/Navbar1';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';

function Home() {
const imageStyle = {
  width: '100vw',
  height: '75vh',
  border: 'none',
  display: 'block',
  margin: '0 auto'
};

  const aboutSection = {
    backgroundColor: '#FFF1CA',
    padding: '40px 0',
    textAlign: 'center',
    fontFamily: 'Instrument Serif, serif',
  };

  const headingStyle = {
    fontFamily: 'Urbanist, sans-serif',
    fontWeight: 'bold',
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2D4F2B',
  };

  const textStyle = {
    fontSize: '24px',
    fontFamily: 'Instrument Serif, serif',
    color: '#2D4F2B',
    textAlign: 'left'
  };

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#FFF1CA'
};


  return (
    <div style={pageStyle}>
      <Navbar1 />

      {/* Info Image */}
      <Container fluid style={{ padding: 0 }}>
        <img
          src="image.png"
          alt="Library Info"
          style={imageStyle}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#F8F8F8',
          fontSize: '85px',
          fontWeight: 'bold',
          textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
          fontFamily: 'Urbanist, sans-serif',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }}>
          Online Library System
        </div>
      </Container>


      {/* About Us Section */}
      <div style={aboutSection}>
        <Container>
          <h2 style={headingStyle}>About Us</h2>
          <p style={textStyle}>
            The Online Library System is a full-stack web application built to modernize how libraries operate. It combines a robust backend using Spring Boot and MySQL with a clean, user-friendly frontend interface.<br/><br/>
            Key features include:<br/>
            - Book catalog with smart search and management<br/>
            - Secure login/logout for users and admins<br/>
            - Borrowing system with transaction tracking<br/><br/>
            Designed for students, librarians, and developers, this platform offers a modular solution for digital library management — making books easier to find, borrow, and organize.<br/>
          </p>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
