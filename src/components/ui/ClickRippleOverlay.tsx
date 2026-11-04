import React, { useEffect, useState } from 'react';
import './click-ripple.css';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const ClickRippleOverlay: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Jangan trigger kalau klik di tombol/link interaktif tertentu kalau mau spesifik,
      // tapi ripple umum di seluruh layar memberikan efek sentuhan yang sangat interaktif.
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-10), newRipple]); // Maksimal 10 ripple aktif bersamaan
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="click-ripple-container" aria-hidden="true">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}
    </div>
  );
};
