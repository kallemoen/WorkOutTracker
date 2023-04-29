import axios from 'axios';

const apiKey = process.env['AIRTABLE_API_KEY']
const baseId = process.env['AIRTABLE_BASE_ID']
const tableId = process.env['AIRTABLE_TABLE_ID']

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const response = await axios.patch(
        `https://api.airtable.com/v0/${baseId}/${tableId}/${req.query.workout_id}`,
        req.body,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
