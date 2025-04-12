'use client';

import { useState } from 'react';
import LaceConnect from '@/components/LaceConnect';

interface ProofResponse {
  sessionHash: string;
  zkProof: {
    proof: string;
    verified: boolean;
    timestamp: number;
  };
}

export default function LandingPage() {
  const [sessionText, setSessionText] = useState('');
  const [result, setResult] = useState<ProofResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const generateProof = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:6300/api/generate-proof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionText,
          userId: 'user123',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate proof');

      const data: ProofResponse = await response.json();
      setResult(data);

      const saveRes = await fetch('http://localhost:6300/api/save-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123',
          sessionText,
          sessionHash: data.sessionHash,
          zkProof: data.zkProof,
        }),
      });

      const saveData = await saveRes.json();

      if (!saveRes.ok) throw new Error('Failed to save session');

      alert(`\u2705 Travel log saved & anchored on Midnight!\nTX: ${saveData.txId}`);
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <LaceConnect />
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">✈️ SafeTrip: Private AI Travel Companion</h1>
      <p className="text-center text-gray-600 mb-6">Describe your travel experience, plans, or reflections. We'll store it privately and anchor it to the blockchain.</p>

      <textarea
        className="w-full p-4 border rounded-lg resize-none h-48 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Spent the morning hiking in Kyoto’s bamboo forest. The view was magical…"
        value={sessionText}
        onChange={(e) => setSessionText(e.target.value)}
      />

      <button
        onClick={generateProof}
        className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save & Anchor Travel Log'}
      </button>

      {result && (
        <div className="mt-8 bg-white border rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🧾 Travel Log Proof</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}