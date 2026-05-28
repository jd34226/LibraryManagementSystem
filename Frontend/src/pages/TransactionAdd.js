import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { addTransaction } from '../services/TransactionService';
import { Container, Row, Col } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

function TransactionAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    borrowDate: '',
    returnDate: '',
    dueDate: '',
    memberId: '',
    bookId: ''
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
      const payload = {
        borrowDate: formData.borrowDate,
        returnDate: formData.returnDate,
        dueDate: formData.dueDate,
        book: { id: parseInt(formData.bookId) },
        member: { id: parseInt(formData.memberId)}
      };
      console.log('Payload:', payload);

      await addTransaction(payload); // your service call

      setAlertMessage('Transaction added successfully!');
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/transaction');
      }, 3000);
    } catch (error) {
      console.error('Error adding transaction:', error);
      setAlertMessage('Failed to add transaction.');
      setAlertType('error');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      borrowDate: '',
      returnDate: '',
      dueDate: '',
      memberId: '',
      bookId: ''
    });
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFF1CA'
  };

  return (
    <div style={pageStyle}>
    <Navbar2 />
    <Banner text="Add Transaction" />
    <Container style={{ marginTop: '30px', marginBottom: '40px' , flex:1}}>
      <form>
        <Row className="mb-3 align-items-center">
          <Col sm={3}><label>Borrow Date</label></Col>
          <Col sm={9}>
            <input
              type="date"
              name="borrowDate"
              className="form-control"
              value={formData.borrowDate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3}><label>Due Date</label></Col>
          <Col sm={9}>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3}><label>Return Date</label></Col>
          <Col sm={9}>
            <input
              type="date"
              name="returnDate"
              className="form-control"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3}><label>Member ID</label></Col>
          <Col sm={9}>
            <input
              type="number"
              name="memberId"
              className="form-control"
              value={formData.memberId}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3}><label>Book ID</label></Col>
          <Col sm={9}>
            <input
              type="number"
              name="bookId"
              className="form-control"
              value={formData.bookId}
              onChange={handleChange}
            />
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

export default TransactionAdd;
