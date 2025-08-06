import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login validation
    const mockUsers = [
      { email: 'borrower@intain.com', password: 'password', name: 'John Borrower', role: 'Borrower' },
      { email: 'fa@intain.com', password: 'password', name: 'Jane Facility Agent', role: 'Facility Agent' },
      { email: 'lender@intain.com', password: 'password', name: 'Bob Lender', role: 'Lender' },
      { email: 'verification@intain.com', password: 'password', name: 'Alice Verification', role: 'verification_agent' },
      { email: 'servicer@intain.com', password: 'password', name: 'Charlie Servicer', role: 'servicer' },
      { email: 'trustee@intain.com', password: 'password', name: 'David Trustee', role: 'trustee' }
    ];

    const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);

    setTimeout(() => {
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          placeholder="Enter your email"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div style={{ 
          color: '#dc3545', 
          marginBottom: '20px', 
          fontSize: '14px' 
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px',
          background: '#FFC000',
          color: '#212121',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6c757d' }}>
        <p><strong>Demo Credentials:</strong></p>
        <p>• Borrower: borrower@intain.com / password</p>
        <p>• Facility Agent: fa@intain.com / password</p>
        <p>• Lender: lender@intain.com / password</p>
        <p>• Verification Agent: verification@intain.com / password</p>
        <p>• Servicer: servicer@intain.com / password</p>
        <p>• Trustee: trustee@intain.com / password</p>
      </div>
    </form>
  );
};

export default Login; 