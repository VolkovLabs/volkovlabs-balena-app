import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Container
 */
export const ContainerIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg
      version="1.1"
      id="Container"
      x="0px"
      y="0px"
      fill="none"
      viewBox="0 0 136 146"
      width={size}
      height={size}
      {...rest}
    >
      <path d="M68 140L69.5 77.5L126 40" stroke="#111111" strokeWidth="2" />
      <path d="M9.5 39L69 76.5L9.5 106.5" stroke="#111111" strokeWidth="2" />
      <path d="M67.5 7L69.5 76.5L125.5 106.5" stroke="#111111" strokeWidth="2" />
      <path
        d="M38.8521 22.5142L68 6.14687L97.1479 22.5142L125.896 39.5734L126.296 73L125.896 106.427L97.1479 123.486L68 139.853L38.8521 123.486L10.1035 106.427L9.70407 73L10.1035 39.5734L38.8521 22.5142Z"
        stroke="#111111"
        strokeWidth="2"
      />
      <path
        d="M101.955 66.4097C101.955 70.8717 101.076 75.29 99.3688 79.4124C97.6612 83.5347 95.1585 87.2804 92.0034 90.4355C88.8482 93.5906 85.1026 96.0934 80.9802 97.8009C76.8579 99.5084 72.4396 100.387 67.9776 100.387C63.5156 100.387 59.0973 99.5084 54.9749 97.8009C50.8526 96.0934 47.1069 93.5906 43.9518 90.4355C40.7967 87.2804 38.2939 83.5347 36.5864 79.4124C34.8789 75.29 34 70.8717 34 66.4097L67.9776 66.4097H101.955Z"
        fill="#9D70F9"
      />
      <path d="M106.547 59.2227L99.2002 68.4058L108.383 71.1607L106.547 59.2227Z" fill="#9D70F9" />
      <rect x="35.4766" y="54.5913" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="48.7734" y="54.5913" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="62.0684" y="54.5913" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="75.3643" y="54.5913" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="87.9209" y="54.5913" width="11.0796" height="10.341" fill="#9D70F9" />
      <rect x="48.7734" y="41.2954" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="62.0684" y="41.2954" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="75.3643" y="41.2954" width="10.341" height="10.341" fill="#9D70F9" />
      <rect x="75.3643" y="28" width="10.341" height="10.341" fill="#9D70F9" />
      <circle cx="67.5" cy="6.5" r="6.5" fill="#FF5656" />
      <circle cx="125.5" cy="39.5" r="6.5" fill="#FF5656" />
      <circle cx="125.5" cy="106.5" r="6.5" fill="#FF5656" />
      <circle cx="67.5" cy="139.5" r="6.5" fill="#FF5656" />
      <circle cx="11.5" cy="106.5" r="6.5" fill="#FF5656" />
      <circle cx="9.5" cy="40.5" r="6.5" fill="#FF5656" />
    </svg>
  );
};
