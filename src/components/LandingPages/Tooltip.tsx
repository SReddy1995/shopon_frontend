
// src/components/Tooltip.tsx
import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && <div className="tooltip-content">{content}</div>}
    </div>
  );
};

export default Tooltip;