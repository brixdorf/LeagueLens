// File: api/proxy.js

export default async function handler(req, res) {
    const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings'; // Replace with your API URL
    const apiKey = '626c6ec9004d42ee9d313cfb843ee5e9'; // Replace with your actual API key
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-Auth-Token': apiKey, // Add API key header for authentication
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the response data
      res.status(200).json(data); // Send the data back to the frontend
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle any errors that occur
    }
  }
  