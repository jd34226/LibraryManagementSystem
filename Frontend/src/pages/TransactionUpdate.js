import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransactionById, updateTransactionById } from '../services/TransactionService';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

function TransactionUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    borrowDate: '',
    returnDate: '',
    dueDate: '',
    memberId: '',
    bookId: ''
  });

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const response = await getTransactionById(id);
        const transaction = Array.isArray(response) ? response[0] : response;
        console.log('Fetched transaction:', transaction);
        const formatted = {
          borrowDate: transaction.borrowDate ? transaction.borrowDate.slice(0, 10) : '',
          returnDate: transaction.returnDate ? transaction.returnDate.slice(0, 10) : '',
          dueDate: transaction.dueDate ? transaction.dueDate.slice(0, 10) : '',
          memberId: transaction.member?.id?.toString() || '',
          bookId: transaction.book?.id?.toString() || ''
        };
        setFormData(formatted);
        setInitialData(formatted);
        console.log('Formatted transaction:', formatted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction:', error.response?.data || error.message);
      }
    }
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        borrowDate: formData.borrowDate,
        dueDate: formData.dueDate,
        returnDate: formData.returnDate?.trim() || null,
        member: { id: parseInt(formData.memberId) },
        book: { id: parseInt(formData.bookId) }
      };

      await updateTransactionById(id, payload);

      setAlertMessage(`Transaction ${id} updated successfully!`);
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/transaction');
      }, 2000);
    } catch (error) {
      console.error('Error updating transaction:', error);
      setAlertMessage('Failed to update transaction.');
      setAlertType('error');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    if (initialData) {
      setFormData(initialData);
    }
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
      <Banner text="Update Transaction Details" />
      <Container style={{ marginTop: '20px', marginBottom: '40px', flex: 1 }}>
        {loading || !formData ? (
          <div className="text-center mt-5">Loading Transaction Data...</div>
        ) : (
          <form>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Transaction ID:</label></Col>
              <Col sm={9}>
                <input className="form-control" value={id} readOnly />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Borrow Date:</label></Col>
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
              <Col sm={3}><label>Due Date:</label></Col>
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
              <Col sm={3}><label>Return Date:</label></Col>
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
              <Col sm={3}><label>Member ID:</label></Col>
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
              <Col sm={3}><label>Book ID:</label></Col>
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
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#708A58',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px'
                }}
              >
                Update
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        )}
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

export default TransactionUpdate;
