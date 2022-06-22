import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Release
 */
export const ReleaseIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg version="1.1" id="Container" x="0px" y="0px" viewBox="0 0 55 54" width={size} height={size} {...rest}>
      <circle cx="27.772" cy="27.1228" r="26.8443" fill="#9D70F9" />
      <path d="M15.1917 23.9305V16.5911H13.9902L14.4734 14.7889H16.9939V23.9305H15.1917Z" fill="#FFFFFF" />
      <path d="M21.0633 23.9305V16.5911H19.8619L20.3451 14.7889H22.8655V23.9305H21.0633Z" fill="#FFFFFF" />
      <path d="M26.935 23.9305V16.5911H25.7335L26.2167 14.7889H28.7372V23.9305H26.935Z" fill="#FFFFFF" />
      <path d="M32.8066 23.9305V16.5911H31.6051L32.0883 14.7889H34.6088V23.9305H32.8066Z" fill="#FFFFFF" />
      <path d="M38.6782 23.9305V16.5911H37.4767L37.9599 14.7889H40.4804V23.9305H38.6782Z" fill="#FFFFFF" />
      <path d="M15.1917 39.892V32.5526H13.9902L14.4734 30.7504H16.9939V39.892H15.1917Z" fill="#FFFFFF" />
      <path d="M21.0633 39.892V32.5526H19.8619L20.3451 30.7504H22.8655V39.892H21.0633Z" fill="#FFFFFF" />
      <path d="M26.935 39.892V32.5526H25.7335L26.2167 30.7504H28.7372V39.892H26.935Z" fill="#FFFFFF" />
      <path d="M32.8066 39.892V32.5526H31.6051L32.0883 30.7504H34.6088V39.892H32.8066Z" fill="#FFFFFF" />
      <path d="M38.6782 39.892V32.5526H37.4767L37.9599 30.7504H40.4804V39.892H38.6782Z" fill="#FFFFFF" />
    </svg>
  );
};
