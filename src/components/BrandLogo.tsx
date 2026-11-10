import React from 'react';

interface BrandLogoProps {
  className?: string;
  height?: number | string;
  showTagline?: boolean;
  isDarkBg?: boolean;
  variant?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  height = 42,
  showTagline = false,
  isDarkBg = false,
  variant: _variant
}) => {
  const pixelHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 42;
  const iconSize = Math.max(34, Math.round(pixelHeight * 0.95));

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Technical Emblem (SVG) */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Emblem Background Gradient */}
          <rect width="48" height="48" rx="12" fill="url(#sstBadgeGrad)" />
          
          {/* Subtle Circuit Grid Accent */}
          <path
            d="M8 14H16M32 14H40M8 34H14M34 34H40M24 6V10M24 38V42"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />

          {/* Laptop Screen Body */}
          <rect
            x="11"
            y="12"
            width="26"
            height="18"
            rx="2.5"
            fill="#0f172a"
            stroke="#60a5fa"
            strokeWidth="1.6"
          />

          {/* Screen Inner Display Area */}
          <rect
            x="13.5"
            y="14.5"
            width="21"
            height="13"
            rx="1.5"
            fill="url(#sstScreenGrad)"
          />

          {/* Display Diagnostic Waves */}
          <path
            d="M16 21H19L21 17L23 24L25 19L27 21H32"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Laptop Keyboard Base */}
          <path
            d="M7 32C7 30.8954 7.89543 30 9 30H39C40.1046 30 41 30.8954 41 32V33C41 34.1046 40.1046 35 39 35H9C7.89543 35 7 34.1046 7 33V32Z"
            fill="#1e293b"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
          {/* Trackpad Indent */}
          <rect x="21" y="31.5" width="6" height="2" rx="0.5" fill="#64748b" />

          {/* Precision Hardware Wrench Accent (Crossing dynamically in vibrant orange) */}
          <g filter="url(#wrenchGlow)">
            <path
              d="M37.5 10.5C36.8 9.8 35.8 9.5 34.8 9.8L32.2 12.4C31.8 12.8 31.8 13.5 32.2 13.9L34.1 15.8C34.5 16.2 35.2 16.2 35.6 15.8L38.2 13.2C38.5 12.2 38.2 11.2 37.5 10.5Z"
              fill="#ff6500"
            />
            <path
              d="M33.2 14.8L25.8 22.2C25.4 22.6 25.4 23.2 25.8 23.6L27.4 25.2C27.8 25.6 28.4 25.6 28.8 25.2L36.2 17.8L33.2 14.8Z"
              fill="#f97316"
            />
          </g>

          {/* Glowing Care Checkmark Dot */}
          <circle cx="39" cy="37" r="3" fill="#10b981" />
          <circle cx="39" cy="37" r="1.5" fill="#ffffff" />

          {/* Gradients */}
          <defs>
            <linearGradient id="sstBadgeGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0b192c" />
              <stop offset="0.6" stopColor="#1e3e62" />
              <stop offset="1" stopColor="#000000" />
            </linearGradient>

            <linearGradient id="sstScreenGrad" x1="13.5" y1="14.5" x2="34.5" y2="27.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>

            <filter id="wrenchGlow" x="22" y="7" width="20" height="22" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#ff6500" floodOpacity="0.5" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark & Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          {/* "SST" */}
          <span 
            className={`font-black tracking-tight text-xl sm:text-2xl ${
              isDarkBg ? 'text-white' : 'text-[#0b192c]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            SST
          </span>

          {/* "CARE" */}
          <span 
            className={`font-extrabold tracking-tight text-xl sm:text-2xl ${
              isDarkBg 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            CARE
          </span>

          {/* Active Status Dot */}
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mb-0.5 ml-0.5 animate-pulse" />
        </div>

        {/* Tagline only if explicitly enabled */}
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span 
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] ${
                isDarkBg ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Electronics Repair
            </span>
            <span className={isDarkBg ? 'text-blue-400/60' : 'text-slate-300'}>•</span>
            <span 
              className={`text-[9px] sm:text-[10px] font-semibold tracking-wider ${
                isDarkBg ? 'text-orange-400' : 'text-blue-700'
              }`}
            >
              Mumbai Doorstep
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
