const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { config } = require('dotenv');
require('dotenv').config();


app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const url1 = process.env.url1; 
    const url2 = process.env.url2; 
  
    const [response1, response2] = await Promise.all([
      axios.get(url1),
      axios.get(url2)
    ]);


    const data1 = response1.data.objects || [];
    const data2 = response2.data.objects || [];

    const combinedData = [...data1, ...data2];


    res.json(combinedData);
  } catch (error) {
    
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


