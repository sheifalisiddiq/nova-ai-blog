import React, { useMemo } from 'react';
import { IconType } from 'react-icons';
import './LogoLoop.css';

export interface LogoLoopItem {
  label: string;
  icon?: IconType;
}

interface LogoLoopProps {
  items: LogoLoopItem[];
  className?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({ items, className = '' }) => {
  const doubled = useMemo(() => [...items, ...items], [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div className={`logo-loop ${className}`.trim()} aria-label="NOVA technology strip">
      <div className="logo-loop__fade" aria-hidden="true" />
      <div className="logo-loop__track">
        {doubled.map((item, index) => (
          <span className="logo-loop__chip" key={`${item.label}-${index}`}>
            {item.icon ? <item.icon className="logo-loop__icon" aria-hidden="true" /> : null}
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
