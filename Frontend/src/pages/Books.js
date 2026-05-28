import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { Container, Table } from 'react-bootstrap';
import { searchBooks, deleteBookById } from '../services/BookService';
import ConfirmBox from '../components/ConfirmBox';
import AlertBox from '../components/AlertBox';

function Books() {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchAvailability, setSearchAvailability] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchId, setSearchId] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'



  useEffect(() => {
    searchBooks({}).then(setSearchResults);
  }, []);

  const normalize = (value) => value?.trim() === '' ? null : value;

  const handleSearch = async () => {
    const query = {
      id: searchId,
      title: normalize(searchTitle),
      author: normalize(searchAuthor),
      genre: normalize(searchGenre),
      year: normalize(searchYear),
      availability: searchAvailability
    };

    const results = await searchBooks(query);
    setSearchResults(results);
    setSelectedBook(null);
  };



  const headingStyle = {
    backgroundColor: '#708A58',
    color: 'white',
    fontWeight: 'bold',
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
      <Banner text="Search Books" />
      <Container style={{ marginTop: '20px', flex: '1' }}>
        {/* Book ID input at the top */}
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter Book ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {/* Title, Author, Genre, Year inputs */}
        <input
          className="form-control mb-2"
          placeholder="Enter Book Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Enter Author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Enter Genre"
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Enter Year"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />

        {/* Availability checkbox and Search button on same row */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* Left side: Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="availabilityCheck"
              checked={searchAvailability}
              onChange={(e) => setSearchAvailability(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="availabilityCheck">
              Only show available books
            </label>
          </div>

          {/* Right side: Buttons grouped together */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={handleSearch}
              style={{
                backgroundColor: '#708A58',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px'
              }}
            >
              Search
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchId('');
                setSearchTitle('');
                setSearchAuthor('');
                setSearchGenre('');
                setSearchYear('');
                setSearchAvailability(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>


        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={headingStyle}>ID</th>
              <th style={headingStyle}>Title</th>
              <th style={headingStyle}>Author</th>
              <th style={headingStyle}>Genre</th>
              <th style={headingStyle}>Year</th>
              <th style={headingStyle}>Availability</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No books found.</td></tr>
            ) : (
              searchResults.map(book => (
                <tr
                  key={book.id}
                  onClick={() => {
                    console.log("Selected:", book);
                    setSelectedBook(book);
                  }}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedBook?.id === book.id ? '#f0f8e2' : 'white',
                    fontWeight: selectedBook?.id === book.id ? 'bold' : 'normal'
                  }}
                >
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.year}</td>
                  <td>{book.availability ? 'Available' : 'Not Available'}</td> {/* ✅ Plain text */}
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', gap: '10px' }}>
          <button
            style={{ backgroundColor: '#708A58', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
            onClick={() => navigate('/books/add')}
          >
            Add
          </button>

          <button
            disabled={!selectedBook}
            style={{
              backgroundColor: selectedBook ? '#708A58' : '#ccc',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none'
            }}
            onClick={() => navigate(`/books/update/${selectedBook.id}`)}
          >
            Edit
          </button>


          <button
            disabled={!selectedBook}
            style={{
              backgroundColor: selectedBook ? '#d9534f' : '#ccc',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none'
            }}
            onClick={() => {
              if (selectedBook) setShowConfirm(true);
            }}
          >
            Delete
          </button>

        </div>

      </Container>

      <ConfirmBox
        show={showConfirm}
        message={`Are you sure you want to delete book ${selectedBook?.id}?`}
        onConfirm={async () => {
          setShowConfirm(false);
          try {
            await deleteBookById(selectedBook.id);
            setAlertMessage(`Book ${selectedBook.id} deleted successfully`);
            setAlertType('success');
            setSearchResults(searchResults.filter(book => book.id !== selectedBook.id));
            setSelectedBook(null);
          } catch (error) {
            console.error('Delete failed:', error);
            setAlertMessage('Failed to delete book');
            setAlertType('error');
          }
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
        onCancel={() => setShowConfirm(false)}
      />

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

export default Books;
