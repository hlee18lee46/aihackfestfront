'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const images = [
  'seoul1.jpg',
  'seoul2.jpg',
  'seoul3.jpg',
  'barcelona1.jpg',
];

export default function EntryPage() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white">
      <div className="relative w-full h-[75vh]">
        <motion.img
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={images[currentImage]}
          alt="Travel"
          className="w-full h-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl text-center"
          >
            <Typewriter
              options={{
                strings: ['Welcome to SafeTrip','Your Trip, in a Safe Trip', 'Start your Journey today'],
                autoStart: true,
                loop: false,
                delay: 75,
              }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full flex justify-center mt-10"
      >
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <button
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-lg transition duration-300 ease-in-out"
          >
            Log In
          </button>
          <button
            onClick={() => router.push('/create-account')}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-lg transition duration-300 ease-in-out"
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
