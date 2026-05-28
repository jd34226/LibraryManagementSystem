import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { Container, Table } from 'react-bootstrap';
import { getOverdueTransactions, getUpcomingTransactions, searchTransactions,deleteTransaction } from '../services/TransactionService';

import ConfirmBox from '../components/ConfirmBox';
import AlertBox from '../components/AlertBox';

function Transaction() {
  const [overdueTransactions, setOverdueTransactions] = useState([]);
  const [transactions, setUpcomingTransactions] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    const fetchData = async () => {
      const overdue = await getOverdueTransactions();
      const upcoming = await getUpcomingTransactions();
      setOverdueTransactions(overdue);
      setUpcomingTransactions(upcoming);
    };

    const fetchInitialSearch = async () => {
      const results = await searchTransactions('');
      setSearchResults(results);
    };

    fetchData();
    fetchInitialSearch();
  }, []);


  const handleSearch = async () => {
    try {
      const results = await searchTransactions(searchId);
      setSearchResults(results);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#FFF1CA'
};

  const headingStyle = {
    backgroundColor: '#708A58',
    color: 'white',
    fontWeight: 'bold',
  };

  const tableStyle = {
    backgroundColor: 'white',
    border: '1px solid #dee2e6'
  };

  const overdueRow = {
  color: 'red',
};


  return (
    <div style={pageStyle}>
      <Navbar1 />
      <Banner text="Upcoming Transactions Due" />

      <Container style={{ marginTop: '20px' }}>
        <Table striped bordered hover style={tableStyle}>
          <thead>
            <tr>
              <th style={headingStyle}>Transaction ID</th>
              <th style={headingStyle}>Member ID</th>
              <th style={headingStyle}>Member Name</th>
              <th style={headingStyle}>Book ID</th>
              <th style={headingStyle}>Book Title</th>
              <th style={headingStyle}>Borrow Date</th>
              <th style={headingStyle}>Due Date</th>
            </tr>
          </thead>

          {/* Overdue Transactions — only if present */}
          {overdueTransactions.length > 0 && (
            <tbody>
              {overdueTransactions.map((txn, index) => (
                <tr key={`overdue-${index}`}>
                  <td style={overdueRow}>{txn.id}</td>
                  <td style={overdueRow}>{txn.member?.id}</td>
                  <td style={overdueRow}>{txn.member?.name}</td>
                  <td style={overdueRow}>{txn.book?.id}</td>
                  <td style={overdueRow}>{txn.book?.title}</td>
                  <td style={overdueRow}>{txn.borrowDate}</td>
                  <td style={overdueRow}>{txn.dueDate}</td>
                </tr>
              ))}
            </tbody>

          )}

          {/* Upcoming Transactions */}
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr key={`upcoming-${index}`}>
                  <td>{txn.id}</td>
                  <td>{txn.member?.id}</td>
                  <td>{txn.member?.name}</td>
                  <td>{txn.book?.id}</td>
                  <td>{txn.book?.title}</td>
                  <td>{txn.borrowDate}</td>
                  <td>{txn.dueDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#2D4F2B' }}>
                  No upcoming transactions
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      <Container style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 'bold', fontSize: '40px', color: '#708A58' }}>
            Search Transaction
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              onClick={handleSearch}
              style={{ backgroundColor: '#708A58', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
            >
              Search
            </button>
          </div>
        </div>

          <>
            <Table striped bordered hover style={tableStyle}>
              <thead>
                <tr>
                  <th style={headingStyle}>Transaction ID</th>
                  <th style={headingStyle}>Member ID</th>
                  <th style={headingStyle}>Book ID</th>
                  <th style={headingStyle}>Borrow Date</th>
                  <th style={headingStyle}>Due Date</th>
                  <th style={headingStyle}>Return Date</th>
                  <th style={headingStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((txn, index) => (
                    <tr
                      key={`search-${index}`}
                      onClick={() => setSelectedTransaction(txn)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: selectedTransaction?.id === txn.id ? '#f0f8e2' : 'white',
                        fontWeight: selectedTransaction?.id === txn.id ? 'bold' : 'normal'
                      }}
                    >
                      <td>{txn.id}</td>
                      <td>{txn.member?.id}</td>
                      <td>{txn.book?.id}</td>
                      <td>{txn.borrowDate}</td>
                      <td>{txn.dueDate}</td>
                      <td>{txn.returnDate || '—'}</td>
                      <td>{txn.status || 'Pending'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#2D4F2B' }}>
                      No Record that Matches Criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>


            <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', gap: '10px' }}>
              <button
                style={{ backgroundColor: '#708A58', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
                onClick={() => window.location.href = '/transaction/add'}
              >
                Add
              </button>

              <button
                disabled={!selectedTransaction}
                style={{
                  backgroundColor: selectedTransaction ? '#708A58' : '#ccc',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none'
                }}
                onClick={() => window.location.href = `/transaction/update/${selectedTransaction?.id}`}
              >
                Edit
              </button>

              <button
              disabled={!selectedTransaction}
              style={{
                backgroundColor: selectedTransaction ? '#d9534f' : '#ccc',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none'
              }}
              onClick={() => {
                if (selectedTransaction) setShowConfirm(true);
              }}
            >
              Delete
            </button>

            </div>
          </>
      </Container>

      <ConfirmBox
        show={showConfirm}
        message={`Are you sure you want to delete Transaction ${selectedTransaction?.id}?`}
        onConfirm={async () => {
          setShowConfirm(false);
          try {
            await deleteTransaction(selectedTransaction.id);
            setAlertMessage(`Transaction ${selectedTransaction.id} deleted successfully`);
            setAlertType('success');
            setSearchResults(searchResults.filter(txn => txn.id !== selectedTransaction.id));
            setSelectedTransaction(null);
          } catch (error) {
            console.error('Delete failed:', error);
            setAlertMessage('Failed to delete Transaction')
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

export default Transaction;
