import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Analytic.css';
import axios from 'axios'; // Import Axios
import { useAuth } from './AuthContext'; // Import isLoggedIn from AuthContext

const Analytic = () => {
  const [urlId, setUrlId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation(); // Retrieve state from navigation
  const shortId = location.state?.shortId; // Get shortId from location state

  

  // Fetch analytics data when the component mounts or when shortId changes
  useEffect(() => {
    if (shortId) {
      setUrlId(shortId);
      fetchAnalytics(shortId);
    }
  }, [shortId]); // React to changes in shortId

  const fetchAnalytics = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8002/url/analytics/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies with the request
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const result = response.data;
        setAnalytics(result); // Store the fetched analytics data
        setError(null); // Clear any previous errors
      } else {
        setAnalytics(null);
        setError(response.data.error || 'ID not found');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('An error occurred while fetching analytics');
    }
  };

  const handleGetAnalytics = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    fetchAnalytics(urlId); // Fetch analytics for the given URL ID
  };

  return (
    <>
      <div className="analytics">
        <h1>Analytics</h1>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Form for manual input of URL ID */}
        <div className="form-container">
          <form className="input-form" onSubmit={handleGetAnalytics}>
            <label htmlFor="urlId">Enter your URL ID</label>
            <input
              type="text"
              placeholder="Enter your URL ID"
              value={urlId} // Initial value is the passed shortId
              onChange={(e) => {
                setUrlId(e.target.value);
                setError(null); // Clear any previous errors
              }}
            />
            <button type="submit">Get Analytics</button> {/* Fetch analytics for the entered URL ID */}
          </form>
        </div>

        {/* Display analytics data if available */}
        {analytics && (
          <div className="analytics-data">
            <h2>Analytics for URL ID: {urlId}</h2> {/* Display URL ID */}
            <h3>Total Clicks: {analytics.totalClicks}</h3> {/* Display total clicks */}
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Visit Time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.analytics.map((visit, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(visit.timestamp).toLocaleString()}</td> {/* Display visit time */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytic;
