import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load the Spline canvas so that the Hero text and name typography render instantly
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = "https://prod.spline.design/1cIJsy8miiNDXCYE/scene.splinecode";

interface SplineBackgroundProps {
  className?: string;
}

export const SplineHero: React.FC<SplineBackgroundProps> = ({ className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Background ambient lighting aura behind 3D object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-gradient-to-tr from-[#9B5CFF]/15 via-transparent to-[#00D9FF]/15 blur-[140px] pointer-events-none" />
      </div>

      <Suspense fallback={null}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Spline
            scene={SCENE_URL}
            onLoad={() => setIsLoaded(true)}
            className="w-full h-full"
          />
        </motion.div>
      </Suspense>

      {/* Subtle bottom gradient vignette to blend cleanly with the About section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090D] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08090D]/60 to-transparent pointer-events-none z-10 hidden lg:block" />
    </div>
  );
};
