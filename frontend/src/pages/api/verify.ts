import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const proof = req.body;
    const app_id = process.env.APP_ID;
    const action = process.env.ACTION_ID;

    try {
        const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse;

        if (verifyRes.success) {
            res.status(200).send(verifyRes);
        } else {
            res.status(400).send(verifyRes);
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

