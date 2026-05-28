import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, updateBookById } from '../services/BookService';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

function BookUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: null,
    author: null,
    genre: null,
    year: null,
    availability: true
  });

  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    async function fetchBook() {
      try {
        const book = await getBookById(id);
        setOriginalData(book);
        setFormData({
          title: null,
          author: null,
          genre: null,
          year: null,
          availability: !!book.availability
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    }
    fetchBook();
  }, [id, navigate]);

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
        title: formData.title?.trim() || null,
        author: formData.author?.trim() || null,
        genre: formData.genre?.trim() || null,
        year: formData.year?.trim() || null,
        availability: formData.availability ? 1 : 0
      };

      await updateBookById(id, payload);

      setAlertMessage(`Book ${id} updated successfully!`);
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/books');
      }, 3000);
    } catch (error) {
      console.error('Error updating book:', error);
      setAlertMessage('Failed to update book.');
      setAlertType('error');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      title: null,
      author: null,
      genre: null,
      year: null,
      availability: !!originalData.availability
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
      <Banner text="Update Book Details" />
      <Container style={{ marginTop: '20px', marginBottom:'40px', flex: '1' }}>
        {loading ? (
          <div className="text-center mt-5">Loading book data...</div>
        ) : (
          <form>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Book ID:</label></Col>
              <Col sm={9}>
                <input
                  className="form-control"
                  placeholder={`${id}`}
                  readOnly
                />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Title</label></Col>
              <Col sm={9}>
                <input
                  name="title"
                  className="form-control"
                  placeholder={originalData.title || ''}
                  value={formData.title ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Author</label></Col>
              <Col sm={9}>
                <input
                  name="author"
                  className="form-control"
                  placeholder={originalData.author || ''}
                  value={formData.author ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Genre</label></Col>
              <Col sm={9}>
                <input
                  name="genre"
                  className="form-control"
                  placeholder={originalData.genre || ''}
                  value={formData.genre ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Year</label></Col>
              <Col sm={9}>
                <input
                  name="year"
                  className="form-control"
                  placeholder={originalData.year || ''}
                  value={formData.year ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-4 align-items-center">
              <Col sm={3}><label htmlFor="availabilityCheck">Available</label></Col>
              <Col sm={9}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="availability"
                  id="availabilityCheck"
                  checked={formData.availability}
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

export default BookUpdate;
