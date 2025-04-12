'use client';

import { useEffect, useState } from 'react';

export default function LaceConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let fetched = false;
  
    if (!dropdownOpen || fetched) return;
  
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:6300/api/user/${userId}`);
        const data = await response.json();
        setWalletAddress(data.wallet?.address || null);
        setEmail(data.email || null);
        fetched = true; // ✅ don't re-fetch on every render
      } catch (err) {
        console.error('❌ Failed to fetch user details:', err);
      }
    };
  
    fetchUserDetails();
  }, [dropdownOpen]);
  

  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:from-purple-600 hover:to-indigo-700 transition"
      >
        Show My Wallet
      </button>

      {dropdownOpen && (walletAddress || email) && (
        <div className="mt-2 bg-white text-gray-800 rounded-xl shadow-lg p-4 w-72 break-words">
          {email && (
            <>
              <p className="font-bold text-sm text-indigo-700 mb-1">Email:</p>
              <p className="text-xs mb-3">{email}</p>
            </>
          )}
          {walletAddress && (
            <>
              <p className="font-bold text-sm text-purple-700 mb-1">Wallet Address:</p>
              <p className="text-xs">{walletAddress}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
