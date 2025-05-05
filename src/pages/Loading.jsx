import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7fafc]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg">Loading report...</p>
      </div>
    </div>
  );
}
