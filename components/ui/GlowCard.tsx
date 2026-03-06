import React, { useMemo, useState } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  spotlight?: 'cyan' | 'blue';
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', spotlight = 'cyan' }) => {
  const [position, setPosition] = useState({ x: '50%', y: '50%' });

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  const style = useMemo(
    () =>
      ({
        '--mx': position.x,
        '--my': position.y
      }) as React.CSSProperties,
    [position.x, position.y]
  );

  return (
    <div
      className={`magic-card ${spotlight === 'blue' ? 'magic-card-blue' : 'magic-card-cyan'} ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPosition({ x: '50%', y: '50%' })}
    >
      {children}
    </div>
  );
};

export default GlowCard;
