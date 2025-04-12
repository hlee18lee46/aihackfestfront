export interface ProofResponse {
    sessionHash: string;
    zkProof: {
      proof: string;
      verified: boolean;
      timestamp: number;
    };
  }
  
  export async function generateProof(
    sessionText: string,
    userId: string
  ): Promise<ProofResponse> {
    const res = await fetch('http://localhost:6300/api/generate-proof', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionText, userId }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to generate zkProof');
    }
  
    return res.json();
  }
  