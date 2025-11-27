import React from 'react';

export default function CTA() {
  return (
    <div className="bg-slate-900 py-16">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-primary">
          Let the world Hear you!
        </h2>
        <p className="text-gray-300 text-lg mb-8 font-secondary">
          Join more than 4,000 bloggers and share your world
        </p>
        <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-slate-900 transition-colors font-secondary">
          Get started
        </button>
      </div>
    </div>
  );
}
