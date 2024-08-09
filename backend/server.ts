import express from 'express';
import { checkVerificationAndApplySubsidy } from './middleware/middleware';
import { Transaction } from 'ethers';

// Initialize Express app
const app = express();
app.use(express.json());

// Example endpoint for sending a transaction
app.post('/sendTransaction', async (req, res) => {
    const tx: Transaction = {
        from: req.body.from,
        to: req.body.to,
        data: req.body.data,
        gasLimit: req.body.gasLimit
    };

    try {
        const response = await checkVerificationAndApplySubsidy(tx);
        res.json({ status: 'success', response });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


