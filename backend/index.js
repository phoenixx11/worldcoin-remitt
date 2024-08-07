require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.post('/generate-credential', (req, res) => {
  const { userId } = req.body;

  // Ensure the user has been verified off-chain
  // This is a placeholder. Implement actual verification check.
  if (isVerifiedOffChain(userId)) {
    const token = jwt.sign({ userId, verified: true }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ error: 'User not verified' });
  }
});

function isVerifiedOffChain(userId) {
  // Placeholder function. Implement actual verification logic.
  return true;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
