import express from 'express';
import Credential from '../models/Credential.js';

const router = express.Router();

router.post('/verify-credential', async (req, res) => {
  const { user, token } = req.body;

  try {
    const credential = await Credential.findOne({ userId: user, token });
    
    if (credential) {
      res.status(200).json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
