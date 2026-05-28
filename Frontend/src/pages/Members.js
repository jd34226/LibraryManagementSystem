import React, { useEffect, useState } from "react";
import Navbar1 from "../components/Navbar1";
import Banner from '../components/Banner';
import Footer from "../components/Footer";
import { Container, Table } from 'react-bootstrap';
import MemberService from "../services/MemberService";
import ConfirmBox from '../components/ConfirmBox';
import AlertBox from '../components/AlertBox';

function Members() {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [searchMemberId, setSearchMemberId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const results = await MemberService.getMembers();
        setMembers(results.data); // assuming axios response
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setMembers([]);
      }
    };

    fetchMembers();
  }, []);



  const handleMemberSearch = async () => {
    try {
      const results = await MemberService.getMembers(); // fetch all members

      if (searchMemberId.trim() === '') {
        // If search field is empty, show all members
        setMembers(results.data);
      } else {
        // Filter by entered Member ID
        const filtered = results.data.filter(member =>
          member.id.toString() === searchMemberId.trim()
        );
        setMembers(filtered);
      }

      setSelectedMemberId(null);
    } catch (error) {
      console.error('Search failed:', error);
      setMembers([]);
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

  return (
    <div style={pageStyle}>
      <Navbar1 />
      <Banner text="Users" />
      <Container style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter Member ID"
            value={searchMemberId}
            onChange={(e) => setSearchMemberId(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleMemberSearch}
            style={{ backgroundColor: '#708A58', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}            >
            Search
          </button>
        </div><br/>

        <Table striped bordered hover style={tableStyle}>
          <thead>
            <tr>
              <th style={headingStyle}>ID</th>
              <th style={headingStyle}>Name</th>
              <th style={headingStyle}>Username</th>
              <th style={headingStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr
                  key={`member-${index}`}
                  onClick={() => setSelectedMemberId(member.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedMemberId === member.id ? '#f0f8e2' : 'white',
                    fontWeight: selectedMemberId === member.id ? 'bold' : 'normal'
                  }}
                >
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.username}</td>
                  <td>{member.role || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#2D4F2B' }}>
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', gap: '10px' }}>
          <button
            style={{ backgroundColor: '#708A58', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
            onClick={() => window.location.href = '/member/add'}
          >
            Add
          </button>

          <button
            disabled={!selectedMemberId}
            style={{
              backgroundColor: selectedMemberId ? '#708A58' : '#ccc',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none'
            }}
            onClick={() => window.location.href = `/member/update/${selectedMemberId}`}
          >
            Edit
          </button>

          <button
            disabled={!selectedMemberId}
            style={{
              backgroundColor: selectedMemberId ? '#d9534f' : '#ccc',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none'
            }}
            onClick={() => {
              if (selectedMemberId) setShowConfirm(true);
            }}
          >
            Delete
          </button>
        </div>

      </Container>

      <ConfirmBox
        show={showConfirm}
        message={`Are you sure you want to delete Member ${selectedMemberId}?`}
        onConfirm={async () => {
          setShowConfirm(false);
          try {
            await MemberService.deleteMember(selectedMemberId);
            setAlertMessage(`Member ${selectedMemberId} deleted successfully`);
            setAlertType('success');
            setMembers(members.filter(m => m.id !== selectedMemberId));
            setSelectedMemberId(null);
          } catch (error) {
            console.error('Delete failed:', error);
            setAlertMessage('Failed to delete member');
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


export default Members;
