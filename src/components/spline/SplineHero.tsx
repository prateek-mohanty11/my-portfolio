import React, { useState, Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Lazy load the Spline canvas so that the Hero text and name typography render instantly
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = "https://prod.spline.design/1cIJsy8miiNDXCYE/scene.splinecode";

interface SplineBackgroundProps {
  className?: string;
}

export const SplineHero: React.FC<SplineBackgroundProps> = ({ className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineAppRef = useRef<any>(null);

  const handleSplineLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    setIsLoaded(true);

    try {
      if (splineApp && splineApp._camera) {
        const isMobile = window.innerWidth < 768;
        // Native 3D camera zoom to make the scene substantially larger and more immersive
        if (typeof splineApp._camera.zoom === 'number') {
          splineApp._camera.zoom = isMobile ? 1.35 : 1.25;
          if (typeof splineApp._camera.updateProjectionMatrix === 'function') {
            splineApp._camera.updateProjectionMatrix();
          }
        }
      }
    } catch {
      // Graceful pass
    }
  };

  // Dynamically adapt camera zoom on window resize
  useEffect(() => {
    const handleResize = () => {
      if (splineAppRef.current && splineAppRef.current._camera) {
        try {
          const isMobile = window.innerWidth < 768;
          if (typeof splineAppRef.current._camera.zoom === 'number') {
            splineAppRef.current._camera.zoom = isMobile ? 1.35 : 1.25;
            if (typeof splineAppRef.current._camera.updateProjectionMatrix === 'function') {
              splineAppRef.current._camera.updateProjectionMatrix();
            }
          }
        } catch {}
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-auto ${className}`}>
      {/* Dynamic ambient lighting aura behind 3D object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-gradient-to-tr from-[#9B5CFF]/20 via-transparent to-[#00D9FF]/20 blur-[150px] pointer-events-none" />
      </div>

      <Suspense fallback={null}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto"
        >
          {/* Scaled container to make the 3D scene significantly larger across mobile, tablet & desktop */}
          <div className="w-[110%] h-[110%] sm:w-[120%] sm:h-[120%] md:w-[130%] md:h-[130%] lg:w-[140%] lg:h-[140%] min-w-full min-h-full flex items-center justify-center transform scale-110 sm:scale-120 md:scale-125 lg:scale-130 transition-transform duration-700 origin-center pointer-events-auto">
            <Spline
              scene={SCENE_URL}
              onLoad={handleSplineLoad}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />
          </div>
        </motion.div>
      </Suspense>

      {/* Subtle bottom gradient vignette to blend cleanly with the About section */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-[#08090D] via-[#08090D]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08090D]/70 to-transparent pointer-events-none z-10 hidden lg:block" />
    </div>
  );
};
