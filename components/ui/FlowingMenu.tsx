import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './FlowingMenu.css';

export interface FlowingMenuItem {
  title: string;
  image: string;
  subtitle?: string;
}

interface FlowingMenuProps {
  items: FlowingMenuItem[];
  className?: string;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const previewRef = useRef<HTMLImageElement | null>(null);
  const marqueeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const previewEl = previewRef.current;
    if (previewEl) {
      gsap.fromTo(previewEl, { autoAlpha: 0.25, scale: 1.02 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power2.out' });
    }

    marqueeRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }

      gsap.killTweensOf(node);

      if (index === activeIndex) {
        gsap.fromTo(node, { xPercent: 0 }, { xPercent: -50, duration: 14, ease: 'none', repeat: -1 });
      } else {
        gsap.set(node, { xPercent: 0 });
      }
    });

    return () => {
      marqueeRefs.current.forEach((node) => {
        if (node) {
          gsap.killTweensOf(node);
        }
      });
    };
  }, [activeIndex]);

  const marqueeText = useMemo(
    () =>
      items.map((item) =>
        Array.from({ length: 6 })
          .map(() => `${item.title} | NOVA`)
          .join('   ')
      ),
    [items]
  );

  if (!items.length) {
    return null;
  }

  return (
    <section className={`flowing-menu ${className}`.trim()}>
      <div className="flowing-menu__grid">
        <div className="flowing-menu__list" role="tablist" aria-label="NOVA Interface Showcase">
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`flowing-menu__item ${isActive ? 'is-active' : ''}`}
              >
                <span className="flowing-menu__title">{item.title}</span>
                {item.subtitle && <span className="flowing-menu__subtitle">{item.subtitle}</span>}
                <div className={`flowing-menu__marquee-wrap ${isActive ? 'is-visible' : ''}`} aria-hidden="true">
                  <div
                    ref={(el) => {
                      marqueeRefs.current[index] = el;
                    }}
                    className="flowing-menu__marquee"
                  >
                    <span>{marqueeText[index]}</span>
                    <span>{marqueeText[index]}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flowing-menu__preview" aria-live="polite">
          <img
            key={items[activeIndex].image}
            ref={previewRef}
            src={items[activeIndex].image}
            alt={items[activeIndex].title}
            loading="lazy"
            className="flowing-menu__preview-image"
          />
          <div className="flowing-menu__preview-meta">
            <p className="flowing-menu__preview-kicker">Active View</p>
            <h3>{items[activeIndex].title}</h3>
            {items[activeIndex].subtitle ? <p>{items[activeIndex].subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowingMenu;
