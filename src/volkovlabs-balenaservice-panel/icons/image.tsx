import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Image
 */
export const ImageIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg version="1.1" id="Weight" x="0px" y="0px" fill="none" viewBox="0 0 90 96" width={size} height={size} {...rest}>
      <rect width="87" height="67" fill="#9D70F9" />
      <rect width="87" height="8" fill="#111111" />
      <circle cx="76.1162" cy="4.35741" r="1.17869" fill="white" />
      <circle cx="79.6514" cy="4.35741" r="1.17869" fill="#F5F6F9" />
      <circle cx="83.1885" cy="4.35741" r="1.17869" fill="white" />
      <path d="M90 75.7343H80.7917V51H68.2083V75.7343H59L74.5 96L90 75.7343Z" fill="#111111" />
      <path
        d="M68.5926 39.3349C68.5926 42.3942 67.99 45.4235 66.8193 48.25C65.6485 51.0764 63.9325 53.6446 61.7693 55.8078C59.606 57.9711 57.0378 59.6871 54.2114 60.8578C51.385 62.0286 48.3556 62.6312 45.2963 62.6312C42.237 62.6312 39.2076 62.0286 36.3812 60.8578C33.5548 59.6871 30.9866 57.9711 28.8233 55.8078C26.6601 53.6446 24.9441 51.0764 23.7733 48.25C22.6026 45.4235 22 42.3942 22 39.3349L45.2963 39.3349H68.5926Z"
        fill="white"
      />
      <path d="M71.7402 34.4072L66.7031 40.7035L72.9994 42.5924L71.7402 34.4072Z" fill="white" />
      <rect x="23.0117" y="31.2319" width="7.09018" height="7.09018" fill="white" />
      <rect x="32.1289" y="31.2319" width="7.09018" height="7.09018" fill="white" />
      <rect x="41.2441" y="31.2319" width="7.09018" height="7.09018" fill="white" />
      <rect x="50.3594" y="31.2319" width="7.09018" height="7.09018" fill="white" />
      <rect x="58.9707" y="31.2319" width="7.59662" height="7.09018" fill="white" />
      <rect x="32.1289" y="22.1157" width="7.09018" height="7.09018" fill="white" />
      <rect x="41.2441" y="22.1157" width="7.09018" height="7.09018" fill="white" />
      <rect x="50.3594" y="22.1157" width="7.09018" height="7.09018" fill="white" />
      <rect x="50.3594" y="13" width="7.09018" height="7.09018" fill="white" />
    </svg>
  );
};
