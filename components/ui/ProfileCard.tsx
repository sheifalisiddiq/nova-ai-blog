import React, { useMemo, useRef, useState } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  onContact?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  onContact
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const transformStyle = useMemo(
    () => ({
      transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
    }),
    [tilt.x, tilt.y]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 7;
    const rotateX = (0.5 - y) * 7;

    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="profile-card-shell">
      <div
        ref={cardRef}
        className="profile-card"
        style={transformStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="profile-card__grid" />
        <div className="profile-card__glow" />

        <div className="profile-card__header">
          <span className="profile-card__status-dot" />
          <span className="profile-card__status-label">{status}</span>
        </div>

        <div className="profile-card__body">
          <div className="profile-card__avatar-wrap">
            <div className="profile-card__avatar-ring" />
            <img
              src={avatarUrl}
              alt={name}
              className="profile-card__avatar"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>

          <div className="profile-card__copy">
            <p className="profile-card__eyebrow">@{handle}</p>
            <h3 className="profile-card__name">{name}</h3>
            <p className="profile-card__title">{title}</p>
          </div>
        </div>

        <div className="profile-card__footer">
          <div className="profile-card__signal">
            <span className="profile-card__signal-label">NOVA Identity</span>
            <span className="profile-card__signal-value">AI Security Engineering Journal</span>
          </div>

          <button type="button" className="profile-card__button" onClick={onContact}>
            {contactText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
