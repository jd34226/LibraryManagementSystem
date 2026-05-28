import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import memberService from "../services/MemberService";
import { Container, Row, Col } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

const MemberUpdate = ({ adminUsername, adminPassword }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: null,
    username: null,
    password: null,
    role: null,
  });

    const [originalData, setOriginalData] = useState({});
    const [loading, setLoading] = useState(true);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    useEffect(() => {
    async function fetchMember() {
      try {
        const response = await memberService.getMemberById(id);
        const member = response.data;
        setOriginalData(member);


        setForm({
          name: null,
          username: null,
          role: member.role || '',
          password: null
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching member:', error);
      }
    }
    fetchMember();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name?.trim() || null,
        username: form.username?.trim() || null,
        role: form.role || null,
        password: form.password?.trim() || null
      };

      await memberService.updateMember(id, payload);

      setAlertMessage(`Member ${id} updated successfully!`);
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/members');
      }, 3000);
    } catch (error) {
      console.error('Error updating member:', error);
      setAlertMessage('Failed to update member.');
      setAlertType('error');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };


    const handleReset = () => {
      setForm({
        name: null,
        username: null,
        role: originalData.role || '',
        password: ''
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
      <Banner text="Update Member Details" />
      <Container style={{ marginTop: '20px', marginBottom:'40px', flex: '1' }}>
        {loading ? (
          <div className="text-center mt-5">Loading book data...</div>
        ) : (
          <form>
            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Member ID:</label></Col>
              <Col sm={9}>
                <input
                  className="form-control"
                  placeholder={`${id}`}
                  readOnly
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Name</label></Col>
              <Col sm={9}>
                <input
                  name="name"
                  className="form-control"
                  placeholder={originalData.name || ''}
                  value={form.name ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Username</label></Col>
              <Col sm={9}>
                <input
                  name="username"
                  className="form-control"
                  placeholder={originalData.username || ''}
                  value={form.username ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Password</label></Col>
              <Col sm={9}>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={form.password ?? ''}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col sm={3}><label>Role</label></Col>
              <Col sm={9}>
                <select
                  name="role"
                  className="form-control"
                  value={form.role ?? ''}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Librarian">Librarian</option>
                </select>
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

export default MemberUpdate;
