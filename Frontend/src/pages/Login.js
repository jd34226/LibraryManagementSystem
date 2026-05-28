import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import memberService from '../services/MemberService'; // Adjust path as needed

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await memberService.login({ username, password });
      setError('');
      navigate('/home'); // Navigate to members page on success
    } catch (err) {
      if (err.response) {
        setError(`Login failed: ${err.response.data}`);
        console.error('Backend error:', err.response.data);
      } else {
        setError('Login failed. Please check your credentials.');
        console.error('Error:', err.message);
      }
    }
  };

  return (
    <div style={{ background: '#FFF1CA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Banner text="LOGIN" />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {/* Left Image Section */}
        <div
          style={{
            flex: '1 1 50%',
            backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Right Login Section */}
        <div
          style={{
            flex: '1 1 50%',
            background: '#FFF1CA',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0',
          }}
        >
          <div
            style={{
              background: 'rgba(255,241,202,0.97)',
              width: '75%',
              boxShadow: '0 0 16px #2D4F2B14',
              borderRadius: '10px',
              padding: '30px',
            }}
          >
            <div
              style={{
                color: '#2D4F2B',
                letterSpacing: '1px',
                fontSize: '20px',
                marginBottom: '20px',
              }}
            >
              OnlineLibrarySystem
            </div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{ color: '#2D4F2B', marginRight: '10px', fontWeight: 'bold' }}
                >
                  USERNAME:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #c1bdad',
                    fontSize: '18px',
                    width: '250px',
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{ color: '#2D4F2B', marginRight: '10px', fontWeight: 'bold' }}
                >
                  PASSWORD:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #c1bdad',
                    fontSize: '18px',
                    width: '250px',
                  }}
                  required
                />
              </div>
              {error && (
                <div style={{ color: '#c0392b', fontWeight: 'bold', marginBottom: '10px' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#2D4F2B',
                    color: '#FFF1CA',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 30px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  style={{
                    background: '#FFF1CA',
                    color: '#2D4F2B',
                    border: '2px solid #2D4F2B',
                    borderRadius: '8px',
                    padding: '10px 30px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => window.location.href = '/'}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
