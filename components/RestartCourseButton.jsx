'use client';

import { useState } from 'react';

export default function RestartCourseButton({ courseId, onRestart }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFirstClick = () => {
    setIsConfirming(true);
  };

  const handleConfirmRestart = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/restart-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to restart course');
      }

      const data = await response.json();
      setIsConfirming(false);
      
      // Call the onRestart callback if provided
      if (onRestart) {
        onRestart(data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setError('');
  };

  if (isConfirming) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy-dark">Are you sure? This will reset your progress.</p>
        <div className="flex gap-2">
          <button
            onClick={handleConfirmRestart}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
          >
            {isLoading ? 'Restarting...' : 'Yes, Restart'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-600 font-semibold">{error}</p>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleFirstClick}
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
    >
      Restart Course
    </button>
  );
}
