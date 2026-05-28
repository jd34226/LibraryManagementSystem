import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { addBook } from '../services/BookService';
import { Container } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

function BookAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    availability: true
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


 const handleSubmit = async () => {
  try {
    const payload = {
      ...formData,
      availability: formData.availability ? 1 : 0
    };
    await addBook(payload);

    setAlertMessage('Book added successfully!');
    setAlertType('success');
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      navigate('/books');
    }, 3000);
  } catch (error) {
    console.error('Error adding book:', error);
    setAlertMessage('Failed to add book.');
    setAlertType('error');
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
};



  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      genre: '',
      year: '',
      availability: true // ✅ Reset to default checked
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
      <Banner text="Add a Book" />
      <Container style={{ marginTop: '20px', flex: '1' }}>
        <form>
          <input
            name="title"
            className="form-control mb-3"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="author"
            className="form-control mb-3"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />
          <input
            name="genre"
            className="form-control mb-3"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <input
            name="year"
            className="form-control mb-3"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          <div className="form-check mb-3">
          <input
              className="form-check-input"
              type="checkbox"
              name="availability"
              id="availabilityCheck"
              checked={formData.availability}
              onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="availabilityCheck">
              Available
          </label>
          </div>

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

export default BookAdd;
