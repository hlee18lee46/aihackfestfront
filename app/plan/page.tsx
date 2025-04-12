'use client';

import { useState } from 'react';
import LaceConnect from '@/components/LaceConnect';

interface ItineraryResponse {
  _id: string;
  result: string;
}

export default function PlanPage() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState('food, culture, nature');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResponse | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:6300/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, destination, days, interests })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Failed to generate itinerary.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-white p-6">
      <LaceConnect />

      <h1 className="text-3xl font-bold text-blue-700 mb-6">🧭 Plan Your Journey</h1>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Destination (e.g., Kyoto, Barcelona)"
          className="w-full p-3 border rounded-lg"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Days"
          className="w-full p-3 border rounded-lg"
          value={Number.isNaN(days) ? '' : days.toString()}
          onChange={(e) => setDays(parseInt(e.target.value) || 0)}
        />

        <input
          type="text"
          placeholder="Interests (e.g., food, history, nature)"
          className="w-full p-3 border rounded-lg"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button
          onClick={generatePlan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Generating Itinerary...' : 'Generate Itinerary'}
        </button>
      </div>

      {result && (
        <div className="w-full max-w-3xl mt-10 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🌍 Your Itinerary</h2>
          <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
  {result.result}
</div>
          
        </div>
      )}
    </main>
  );
}
