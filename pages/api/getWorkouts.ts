// pages/api/getWorkouts.js
import axios from 'axios';

const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID
const tableId = process.env.AIRTABLE_TABLE_ID
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await axios.get(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Airtable request failed:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
