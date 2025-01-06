// api/fetchFootballData.js
export default async function handler(req, res) {
  const apiUrl = "https://api.football-data.org/v4/competitions/PL/standings";
  const apiKey = process.env.API_KEY; // Store your API key in environment variables

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Auth-Token": apiKey, // Add API key in headers
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
