export default async function handler(req, res) {
  const { series_id, start_date, end_date } = req.query;
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing FRED API key' });
  }

  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${apiKey}&file_type=json&start_date=${start_date}&end_date=${end_date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fred error', details: error.message });
  }
}
