import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Device
 */
export const DeviceIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg version="1.1" id="Device" x="0px" y="0px" fill="none" viewBox="0 0 81 79" width={size} height={size} {...rest}>
      <path
        d="M74 41.8262C74 46.6851 73.043 51.4964 71.1835 55.9855C69.3241 60.4745 66.5987 64.5534 63.163 67.9891C59.7272 71.4249 55.6483 74.1503 51.1593 76.0097C46.6702 77.8691 41.8589 78.8262 37 78.8262C32.1411 78.8262 27.3298 77.8691 22.8407 76.0097C18.3517 74.1503 14.2728 71.4249 10.837 67.9891C7.40128 64.5534 4.67588 60.4745 2.81646 55.9855C0.957032 51.4964 -4.24779e-07 46.6851 0 41.8262L37 41.8262H74Z"
        fill="#9D70F9"
      />
      <path d="M79 34L71 44L81 47L79 34Z" fill="#9D70F9" />
      <rect x="1.6084" y="28.9565" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="16.0869" y="28.9565" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="30.5654" y="28.9565" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="45.0439" y="28.9565" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="58.7178" y="28.9565" width="12.0652" height="11.2609" fill="#9D70F9" />
      <rect x="16.0869" y="14.4783" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="30.5654" y="14.4783" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="45.0439" y="14.4783" width="11.2609" height="11.2609" fill="#9D70F9" />
      <rect x="45.0439" width="11.2609" height="11.2609" fill="#9D70F9" />
    </svg>
  );
};
