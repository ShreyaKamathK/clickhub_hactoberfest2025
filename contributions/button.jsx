'use client';

import { useState, useRef } from 'react';

export default function RippleGlowButton() {
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef(null);
  
  const handleClick = (e) => {
    const button = buttonRef.current;
    
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    // Change state to clicked
    setClicked(true);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden px-6 py-3 font-semibold rounded-lg
        transition-all duration-300 shadow-md
        ${clicked ? 'bg-pink-500 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'}
        hover:shadow-xl`}
    >
      <span className="relative z-10">{clicked ? 'Clicked' : 'Ripple'}</span>

      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          background-color: rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
