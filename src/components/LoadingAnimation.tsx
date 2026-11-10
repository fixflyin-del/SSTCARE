import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if user already saw animation in this session
    const hasSeen = sessionStorage.getItem('sstcare_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen && !forceShow) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    if (prefersReducedMotion && !forceShow) {
      sessionStorage.setItem('sstcare_intro_seen', 'true');
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Set animation timing: 1.5s display, then 0.4s fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1400);

    const endTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('sstcare_intro_seen', 'true');
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [forceShow, onComplete]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="SST CARE Loading"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070e17] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Brand Logo Badge */}
        <div className="transform transition-all duration-700 ease-out scale-100 animate-in fade-in zoom-in-95">
          <img
            src="/assets/sstcare-logo-badge.png"
            alt="SST CARE"
            className="w-auto h-20 sm:h-24 md:h-28 object-contain drop-shadow-[0_10px_25px_rgba(30,62,98,0.4)]"
          />
        </div>

        {/* Tagline */}
        <div className="mt-5 overflow-hidden">
          <p className="text-sm sm:text-base font-semibold tracking-wider text-slate-200 uppercase transition-all duration-700 delay-300">
            Professional Electronics Repair Service
          </p>
          <p className="text-xs text-orange-400 font-medium tracking-wide mt-1">
            Doorstep Service in Mumbai
          </p>
        </div>

        {/* Subtle loading indicator */}
        <div className="mt-6 w-36 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 w-full animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </aside>
  );
};
