const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send('hello from backend');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend is working on port: ${PORT}`);
});
