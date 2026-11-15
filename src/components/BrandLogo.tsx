import React from 'react';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  height?: number | string;
  showTagline?: boolean;
  isDarkBg?: boolean;
  variant?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = '',
  height,
}) => {
  const pixelHeight = height
    ? typeof height === 'number'
      ? height
      : parseInt(String(height), 10) || 48
    : undefined;

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src="/assets/aistudio/SST_CARE_3D_Tech_Repair_Logo-removebg-preview_2f57b979.png"
        alt="SST CARE"
        style={!imgClassName && pixelHeight ? { height: `${pixelHeight}px`, width: 'auto' } : undefined}
        className={`object-contain max-w-full transition-transform duration-300 hover:scale-102 ${
          imgClassName || (!pixelHeight ? 'h-14 w-auto' : '')
        }`}
        draggable={false}
      />
    </div>
  );
};
