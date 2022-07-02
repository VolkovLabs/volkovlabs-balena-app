import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Release
 */
export const ReleaseIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg
      version="1.1"
      id="Container"
      x="0px"
      y="0px"
      fill="none"
      viewBox="0 0 54 54"
      width={size}
      height={size}
      {...rest}
    >
      <circle cx="26.8443" cy="26.8443" r="26.8443" fill="#9D70F9" />
      <path
        d="M43.694 36.5164C43.8563 36.4293 43.9575 36.2601 43.9575 36.0759L43.9577 18.5265C43.9577 18.3498 43.8645 18.1863 43.7125 18.0963C43.5605 18.0063 43.3723 18.0031 43.2174 18.088L27.8695 26.4999C27.7133 26.5855 27.6144 26.7478 27.6099 26.9258L27.1672 44.5416C27.1627 44.7197 27.2533 44.8867 27.405 44.98C27.5567 45.0734 27.7466 45.079 27.9036 44.9947L43.694 36.5164Z"
        fill="#111111"
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M11.6999 36.5574C11.5411 36.4688 11.443 36.301 11.4436 36.1192L11.5026 18.5429C11.5032 18.3664 11.5967 18.2033 11.7488 18.1138C11.9008 18.0242 12.0889 18.0214 12.2435 18.1064L27.6778 26.5934C27.8402 26.6827 27.9399 26.8545 27.9368 27.0398L27.6441 44.6161C27.6412 44.792 27.5461 44.9533 27.3937 45.0411C27.2413 45.1289 27.054 45.1301 26.9004 45.0444L11.6999 36.5574Z"
        fill="#FF5656"
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M27.9851 9.56154C27.8354 9.47949 27.6541 9.47949 27.5044 9.56154L12.0585 18.0273C11.8984 18.1151 11.7988 18.2832 11.7988 18.4658C11.7988 18.6484 11.8984 18.8165 12.0585 18.9043L27.5044 27.3701C27.6541 27.4521 27.8354 27.4521 27.9851 27.3701L43.431 18.9043C43.5911 18.8165 43.6907 18.6484 43.6907 18.4658C43.6907 18.2832 43.5911 18.1151 43.431 18.0273L27.9851 9.56154Z"
        fill="#9D70F9"
        stroke="white"
        strokeLinejoin="round"
      />
    </svg>
  );
};
