import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  pullFactor = 0.35,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * pullFactor);
    y.set(distanceY * pullFactor);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cn('inline-flex items-center justify-center transition-colors', className)}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
