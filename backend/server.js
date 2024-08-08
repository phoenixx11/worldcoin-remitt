import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import Credential from './models/Credential.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.post('/generate-credential', async (req, res) => {
  const { userId } = req.body;

  try {
    const token = generateJWT(userId); 

    // Store the credential in the database
    const credential = new Credential({
      userId,
      token,
    });

    await credential.save();

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating credential:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import jwt from 'jsonwebtoken';

const generateJWT = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
