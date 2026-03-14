import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedList.css';

interface AnimatedListItem {
  id: string;
  label: string;
  meta?: string;
}

interface AnimatedListProps {
  items: AnimatedListItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

const AnimatedList: React.FC<AnimatedListProps> = ({ items, activeId, onSelect, className = '' }) => {
  return (
    <div className={`animated-list ${className}`.trim()}>
      <div className="animated-list__header">
        <p className="animated-list__eyebrow">Timeline Navigation</p>
        <h3 className="animated-list__title">Weekly Index</h3>
        <p className="animated-list__subtitle">Jump directly to each NOVA development milestone.</p>
      </div>

      <div className="animated-list__rail" role="tablist" aria-label="Weekly blog post navigation">
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={item.id}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(item.id)}
              className={`animated-list__item ${isActive ? 'animated-list__item--active' : ''}`}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
            >
              <span className="animated-list__pulse" />
              <span className="animated-list__copy">
                <span className="animated-list__label">{item.label}</span>
                {item.meta ? <span className="animated-list__meta">{item.meta}</span> : null}
              </span>
              <span className="animated-list__arrow" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedList;
