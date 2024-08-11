import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/verify', async (req: Request, res: Response) => {
  const { proof } = req.body;
  const app_id = process.env.APP_ID;
  const action = process.env.ACTION_ID;

  if (!proof || !app_id || !action) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }

  try {
    const response = await axios.post(`https://developer.worldcoin.org/api/v1/verify/${app_id}`, {
      ...proof,
      action: action,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.data.success) {
      res.status(200).json({ message: "Verification successful" });
    } else {
      res.status(400).json({ message: "Verification failed" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
