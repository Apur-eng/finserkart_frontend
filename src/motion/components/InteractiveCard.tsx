import React, { type ReactNode } from 'react';

export interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isClickable?: boolean;
  className?: string;
}

/**
 * InteractiveCard
 * Combines CSS transition tokens with accessible keyboard focus indicators.
 * Provides subtle upward lift and shadow bloom on hover without heavy JS overhead.
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  isClickable = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      className={`fsk-motion-card fsk-motion-focus-visible fsk-hardware-accelerated ${className}`}
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        background: '#ffffff',
        padding: '24px',
        cursor: isClickable ? 'pointer' : 'default',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
