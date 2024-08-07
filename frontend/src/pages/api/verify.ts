import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const proof = req.body;
    const app_id = process.env.APP_ID;
    const action = process.env.ACTION_ID;

    try {
        const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse;

        if (verifyRes.success) {
        
            try {
                const backendRes = await axios.post('http://localhost:3000/generate-credential', {
                    userId: proof.userIdentifier, 
                });

                res.status(200).json({
                    verifyRes,
                    credential: backendRes.data.token,
                });
            } catch (error) {
                console.error("Credential generation error:", error);
                res.status(500).json({ message: "Failed to generate credential" });
            }
        } else {
            res.status(400).send(verifyRes);
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}



