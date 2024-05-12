import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import './Signup.css';
import axios from 'axios';

export const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // State for tracking errors
  const navigate = useNavigate(); // Hook for navigation

  // Handles input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      const response = await axios.post(
        'http://localhost:8002/user/login', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setError(null); // Clear any previous errors
        onLogin(); // Call onLogin function to update the login state
        // navigate('/'); // Navigate to the home page upon successful login
        window.location.href = '/';
      } else {
        const errorData = response.data;
        setError(errorData.error || 'Login failed'); // Display error message if available
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="signup"> {/* Consider renaming this class to "login" */}
      <div className="form-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>} {/* Display errors */}
        <form className="input-form" onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Login</button> {/* Corrected button text */}
        </form>
      </div>
    </div>
  );
};

