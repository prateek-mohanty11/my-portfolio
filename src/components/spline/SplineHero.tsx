import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Cuboid, ExternalLink } from 'lucide-react';

// Lazy load the Spline canvas so that the Hero text and name typography render instantly
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = "https://prod.spline.design/VaFskeBrBPZK9w1v/scene.splinecode";

export const SplineHero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    setIsLoaded(true);
  };

  const handleSplineError = () => {
    setHasError(true);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[600px] flex items-center justify-center">
      {/* Background ambient lighting aura behind 3D object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#9B5CFF]/20 to-[#00D9FF]/20 blur-3xl" />
      </div>

      {/* Loading state indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
          <div className="p-3 rounded-2xl bg-[#10121A]/80 border border-[#9B5CFF]/30 backdrop-blur-md flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#00D9FF] animate-spin" />
            <span className="text-xs font-mono text-[#A3A8B8] tracking-wider uppercase">
              Initializing 3D Interactive Scene...
            </span>
          </div>
        </div>
      )}

      {/* Fallback in case WebGL context fails or offline */}
      {hasError ? (
        <div className="relative z-10 p-6 rounded-2xl bg-[#10121A]/90 border border-red-500/30 text-center max-w-sm">
          <Cuboid className="w-12 h-12 text-[#9B5CFF] mx-auto mb-3" />
          <h4 className="font-display font-semibold text-[#F5F5FA] mb-1">Interactive 3D Workspace</h4>
          <p className="text-xs text-[#A3A8B8] mb-4">
            Could not initialize WebGL canvas. You can inspect the interactive model directly on Spline.
          </p>
          <a
            href="https://app.spline.design/community/file/a1f156f7-ef01-42d1-bf7b-5be1b7967b0a"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-[#151824] border border-[#00D9FF]/40 text-[#00D9FF] hover:border-[#00D9FF]"
          >
            <span>View Scene on Spline</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-[#9B5CFF] animate-spin" />
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.96 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full relative z-10"
          >
            <Spline
              scene={SCENE_URL}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              className="w-full h-full"
            />
          </motion.div>
        </Suspense>
      )}

      {/* Floating 3D Interaction Badge & Spline Attribution */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="px-2.5 py-1 rounded-full bg-[#10121A]/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#A3A8B8] flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
          <span>Interactive 3D • Hover & Drag</span>
        </div>
      </div>
    </div>
  );
};

