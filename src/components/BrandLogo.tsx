import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'badge' | 'transparent' | 'original';
  height?: number | string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'transparent',
  height = 42,
  showTagline = false
}) => {
  // We use the authentic logo badge created directly from the user's uploaded reference
  let src = '/assets/sstcare-logo-badge-transparent.png';
  if (variant === 'badge') {
    src = '/assets/sstcare-logo-badge.png';
  } else if (variant === 'original') {
    src = '/assets/aistudio/WhatsApp_Image_2026-11-04_at_3.25.19_PM_1f79d9ed.jpeg';
  }

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      <img
        src={src}
        alt="SST CARE — Professional Electronics Repair Service"
        className="object-contain rounded-md transition-transform hover:scale-[1.02]"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        loading="eager"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to non-transparent if needed
          const target = e.currentTarget;
          if (target.src.includes('-transparent')) {
            target.src = '/assets/sstcare-logo-badge.png';
          }
        }}
      />
      {showTagline && (
        <div className="hidden lg:flex flex-col border-l border-slate-200 pl-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            Professional Electronics Repair
          </span>
          <span className="text-[11px] text-slate-500">
            Mumbai Doorstep Service
          </span>
        </div>
      )}
    </div>
  );
};
