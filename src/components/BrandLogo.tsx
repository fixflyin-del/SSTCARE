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
  height = 48,
}) => {
  const pixelHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 48;

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src="/assets/aistudio/SST_CARE_3D_Tech_Repair_Logo-removebg-preview_2f57b979.png"
        alt="SST CARE"
        style={{ height: `${pixelHeight}px`, width: 'auto' }}
        className="object-contain max-w-full transition-transform duration-300 hover:scale-102"
        draggable={false}
      />
    </div>
  );
};
