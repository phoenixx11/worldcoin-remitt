import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { proof } = req.body; 
    const app_id = process.env.NEXT_PUBLIC_APP_ID;
    const action = process.env.NEXT_PUBLIC_ACTION_ID;

    try {
        const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse;

        if (verifyRes.success) {
            const userId = proof.userIdentifier; 

            try {
                // Send the userId and proof token to backend for storage
                const backendRes = await axios.post('http://localhost:3000/api/verify-credential', {
                    userId: userId, 
                    token: proof.token,
                });

                if (backendRes.status === 200) {
                    res.status(200).json({
                        verifyRes,
                        credential: backendRes.data.credential,
                    });
                } else {
                    res.status(500).json({ message: "Failed to generate credential" });
                }
            } catch (error) {
                console.error("Credential generation error:", error);
                res.status(500).json({ message: "Failed to generate credential" });
            }
        } else {
            res.status(400).json({ message: "Verification failed", details: verifyRes });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}




