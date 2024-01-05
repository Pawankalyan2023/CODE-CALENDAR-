const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());


app.get('/api/data', async (req, res) => {
  try {
    const clistURL = 'https://clist.by/api/v4/contest/?format=json&username=pawan@2003&api_key=f62dc66742b9b03ed03339db36ee857b5439e71e';
    const response = await axios.get(clistURL);
    const data = response.data;

    // Forward data to the frontend (replace 'http://frontend-url' with your frontend URL)
    axios.post('http://localhost:3001/api/data', { data })
      .then(() => {
        res.status(200).json({ message: 'Data sent to the frontend successfully' });
      })
      .catch(error => {
        console.error('Error sending data to frontend:', error);
        res.status(500).json({ error: 'An error occurred while sending data to the frontend' });
      });
  } catch (error) {
    console.error('Error fetching data from clist.by:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from clist.by' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
