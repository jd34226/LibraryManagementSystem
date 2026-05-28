import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import memberService from '../services/MemberService';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

function MemberAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: null,
    username: null,
    password: null,
    role: null
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await memberService.addMember(formData);

      setAlertMessage('Member added successfully!');
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/members');
      }, 3000);
    } catch (error) {
      console.error('Error adding member:', error);
      setAlertMessage('Member already exists or an error occurred.');
      setAlertType('error');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleReset = () => setFormData({ name: '', username: '', password: '', role: '' });

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFF1CA'
  };

  return (
    <div style={pageStyle}>
      <Navbar2 />
      <Banner text="Add a Book" />
      <Container style={{ marginTop: '20px', flex: '1' }}>
        <form>
          <Row className="mb-3 align-items-center">
            <Col sm={3}><label>Name</label></Col>
            <Col sm={9}>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col sm={3}><label>Username</label></Col>
            <Col sm={9}>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col sm={3}><label>Password</label></Col>
            <Col sm={9}>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col sm={3}><label>Role</label></Col>
            <Col sm={9}>
              <select
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Librarian">Librarian</option>
              </select>
            </Col>
          </Row>


          <div className="d-flex justify-content-center gap-3">
            <button type="button" className="btn btn-success" onClick={handleSubmit}
            style={{
                backgroundColor: '#708A58',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px'
              }}>
              Add
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </Container>

      <AlertBox
        show={showAlert}
        message={alertMessage}
        type={alertType}
        onClose={() => setShowAlert(false)}
      />
      <Footer />
    </div>
  );
}

export default MemberAdd;
