import React from 'react';
import { ISuccessResult } from '@worldcoin/idkit'; 

const handleVerify = async (proof: ISuccessResult) => {
    try {
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ proof }), 
        });

        if (!res.ok) {
            throw new Error("Verification failed.");
        } else {
            const data = await res.json();
            console.log("Verification successful:", data);
        }
    } catch (error) {
        console.error("Error during verification:", error);
    }
};

const VerifyComponent = () => {
    const proof: ISuccessResult = {}; 

    return (
        <div>
            <button onClick={() => handleVerify(proof)}>
                Verify with World ID
            </button>
        </div>
    );
};

export default VerifyComponent;
