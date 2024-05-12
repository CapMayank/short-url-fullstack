import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';


const ShortUrl = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [shortId, setShortId] = useState('');
  const { isLoggedIn } = useAuth();


  const handleInputChange = (e) => {
    setOriginalURL(e.target.value); // Update the original URL
  };

  const handleShorten = async (event) => {
    event.preventDefault(); // Prevent default form behavior
  
    try {
      const response = await axios.post(
        'http://localhost:8002/url',
        { url: originalURL }, // JSON payload with the original URL
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const result = response.data; // Obtain the response data
        setShortenedURL(`http://localhost:8002/url/${result.ID}`); // Set the shortened URL
        setShortId(result.ID); // Store the short ID for copying
      } else {
        console.error('Failed to shorten URL'); // Handle failure case
      }
    } catch (err) {
      console.error('Error during URL shortening:', err); // Handle errors
    }
  };
  
  

  const copyShortId = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = shortId;
    document.body.appendChild(tempInput);

    // Select the input field
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the input field
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    alert("Copied the text: " + shortId);
  };

  return (
    <>
      <div className="short-url">
        <h1>Shor10 Your URL</h1>
        <div className="form-container">
          <form className="input-form" onSubmit={handleShorten}>
            <label htmlFor="url">Enter your URL</label>
            <input
              type="text"
              placeholder="Enter your URL here"
              value={originalURL}
              onChange={handleInputChange}
            />
            <button type="submit">Shorten</button>
          </form>
        </div>
        {shortenedURL && (
          <div className="shortened-url">
            <h2>Your shortened URL</h2>
            <a href={shortenedURL} target="_blank" rel="noreferrer">
              {shortenedURL}
            </a>
            <br />
            <a onClick={copyShortId}>
              {shortId}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default ShortUrl