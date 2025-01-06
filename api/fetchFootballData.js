export default async function handler(req, res) {
  const { league } = req.query;
  const apiKey = process.env.API_KEY;

  if (!league) {
    return res.status(400).json({ error: "League is required" });
  }

  const apiUrl = `https://api.football-data.org/v4/competitions/${league}/standings`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Auth-Token": apiKey,
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