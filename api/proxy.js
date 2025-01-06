export default async function handler(req, res) {
  const apiUrl = `https://api.football-data.org/v4/competitions/${league}/standings`;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Auth-Token": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}