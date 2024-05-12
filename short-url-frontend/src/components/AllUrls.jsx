import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './AllUrls.css';
import { useAuth } from './AuthContext';

const AllUrls = () => {
  
  const [urls, setUrls] = useState([]); // State for storing URLs
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://localhost:8002/url/all', {
          withCredentials: true, // Include cookies in the request
        });

        if (response.status >= 200 && response.status < 300) { // Success range
          setUrls(response.data); // Store the fetched URLs
          setError(null); // Clear errors
        } else {
          setError(response.data.error || 'Failed to fetch URLs'); // Handle errors
        }
      } catch (err) {
        console.error("Error fetching URLs:", err);
        setError("An error occurred while fetching URLs"); // Handle exceptions
      }
    };

    fetchUrls(); // Fetch the URLs when the component mounts
  }, []); // Only run on initial mount

  const handleGetAnalytics = (shortId) => {
    try {
      navigate(`/analytics`, { state: { shortId } }); // Navigate to analytics with the URL ID
    } catch (err) {
      console.error("Error during analytics fetch:", err);
      setError("An error occurred while fetching analytics"); // Handle errors
    }
  };


  return (
    <div className="allurls">
      <h1>All URLs</h1>
      {error && <p className="error-message">{error}</p>}
      {!error && urls.length > 0 ? (
        <div className="tblresponsive">
        <table className="urls-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Original URL</th>
              <th>Shortened URL</th>
              <th>Analytics</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{url.redirectURL}</td>
                <td><a href={`http://localhost:8002/url/${url.shortId}`} target="_blank" rel="noopener noreferrer">
                    {`http://localhost:8002/url/${url.shortId}`}
                  </a>
                </td>
                <td><button onClick={() => handleGetAnalytics(url.shortId)}>Get Analytics</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No URLs found</p>
      )}
    </div>
  );
};

export default AllUrls;
