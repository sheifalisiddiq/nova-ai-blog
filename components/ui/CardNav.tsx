import React from 'react';
import { motion } from 'framer-motion';
import './CardNav.css';

interface CardNavItem {
  id: string;
  label: string;
  title: string;
}

interface CardNavProps {
  items: CardNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

const CardNav: React.FC<CardNavProps> = ({ items, activeId, onSelect, className = '' }) => {
  return (
    <div className={`card-nav ${className}`.trim()}>
      <div className="card-nav__header">
        <p className="card-nav__eyebrow">Weekly Navigation</p>
        <h3 className="card-nav__title">Week-to-Week Access</h3>
        <p className="card-nav__subtitle">Jump through NOVA milestones without losing your place in the journal.</p>
      </div>

      <div className="card-nav__rail" role="navigation" aria-label="Weekly blog navigation">
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`card-nav__item ${isActive ? 'card-nav__item--active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <span className="card-nav__badge">{item.label}</span>
              <span className="card-nav__copy">
                <span className="card-nav__item-title">{item.title}</span>
              </span>
              <span className="card-nav__chevron" aria-hidden="true">
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

export default CardNav;
