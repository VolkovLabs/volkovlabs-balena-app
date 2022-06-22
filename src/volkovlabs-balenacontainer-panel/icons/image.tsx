import React, { FC } from 'react';
import { SVGProps } from '../types';

/**
 * Weight
 */
export const ImageIcon: FC<SVGProps> = ({ size, fill, title, ...rest }) => {
  return (
    <svg version="1.1" id="Weight" x="0px" y="0px" viewBox="0 0 79 58" width={size} height={size} {...rest}>
      <rect width="78.0361" height="57.8978" fill="#9D70F9" />
      <rect y="5.03455" width="78.0361" height="0.629324" fill="white" />
      <circle cx="68.5467" cy="2.73838" r="1.05454" fill="white" />
      <circle cx="71.7088" cy="2.73838" r="1.05454" fill="white" />
      <circle cx="74.8729" cy="2.73838" r="1.05454" fill="white" />
      <path d="M21.6738 26.8091V16.7127H20L20.6732 14.2335H24.1845V26.8091H21.6738Z" fill="white" />
      <path
        d="M32.9829 27.0427C32.2491 27.0427 31.579 26.875 30.9726 26.5396C30.3661 26.1983 29.8385 25.7282 29.3898 25.1294C28.9471 24.5305 28.6044 23.8389 28.3618 23.0544C28.1193 22.2639 27.998 21.4196 27.998 20.5213C27.998 19.6231 28.1193 18.7817 28.3618 17.9972C28.6044 17.2068 28.9471 16.5121 29.3898 15.9133C29.8385 15.3144 30.3661 14.8474 30.9726 14.512C31.579 14.1707 32.2491 14 32.9829 14C33.7167 14 34.3869 14.1707 34.9933 14.512C35.5998 14.8474 36.1213 15.3144 36.5579 15.9133C37.0006 16.5121 37.3433 17.2068 37.5859 17.9972C37.8284 18.7817 37.9497 19.6231 37.9497 20.5213C37.9497 21.4196 37.8284 22.2639 37.5859 23.0544C37.3433 23.8389 37.0006 24.5305 36.5579 25.1294C36.1213 25.7282 35.5998 26.1983 34.9933 26.5396C34.3869 26.875 33.7167 27.0427 32.9829 27.0427ZM32.9829 24.5635C33.5833 24.5635 34.0776 24.3719 34.4657 23.9886C34.8538 23.6053 35.1389 23.1053 35.3208 22.4885C35.5088 21.8717 35.6028 21.216 35.6028 20.5213C35.6028 19.7848 35.5027 19.1111 35.3026 18.5003C35.1085 17.8894 34.8174 17.4014 34.4293 17.0361C34.0412 16.6648 33.5591 16.4792 32.9829 16.4792C32.5281 16.4792 32.1339 16.59 31.8004 16.8115C31.4729 17.0331 31.2 17.3355 30.9817 17.7188C30.7694 18.102 30.6087 18.5362 30.4996 19.0212C30.3965 19.5003 30.3449 20.0003 30.3449 20.5213C30.3449 21.216 30.4389 21.8717 30.6269 22.4885C30.821 23.0993 31.1121 23.5994 31.5002 23.9886C31.8944 24.3719 32.3886 24.5635 32.9829 24.5635Z"
        fill="white"
      />
      <path d="M42.7241 26.8091V16.7127H41.0503L41.7234 14.2335H45.2347V26.8091H42.7241Z" fill="white" />
      <path
        d="M54.0332 27.0427C53.2994 27.0427 52.6293 26.875 52.0229 26.5396C51.4164 26.1983 50.8888 25.7282 50.44 25.1294C49.9973 24.5305 49.6547 23.8389 49.4121 23.0544C49.1695 22.2639 49.0482 21.4196 49.0482 20.5213C49.0482 19.6231 49.1695 18.7817 49.4121 17.9972C49.6547 17.2068 49.9973 16.5121 50.44 15.9133C50.8888 15.3144 51.4164 14.8474 52.0229 14.512C52.6293 14.1707 53.2994 14 54.0332 14C54.767 14 55.4371 14.1707 56.0436 14.512C56.65 14.8474 57.1716 15.3144 57.6082 15.9133C58.0509 16.5121 58.3936 17.2068 58.6361 17.9972C58.8787 18.7817 59 19.6231 59 20.5213C59 21.4196 58.8787 22.2639 58.6361 23.0544C58.3936 23.8389 58.0509 24.5305 57.6082 25.1294C57.1716 25.7282 56.65 26.1983 56.0436 26.5396C55.4371 26.875 54.767 27.0427 54.0332 27.0427ZM54.0332 24.5635C54.6336 24.5635 55.1278 24.3719 55.516 23.9886C55.9041 23.6053 56.1891 23.1053 56.3711 22.4885C56.5591 21.8717 56.6531 21.216 56.6531 20.5213C56.6531 19.7848 56.553 19.1111 56.3529 18.5003C56.1588 17.8894 55.8677 17.4014 55.4796 17.0361C55.0915 16.6648 54.6093 16.4792 54.0332 16.4792C53.5784 16.4792 53.1842 16.59 52.8506 16.8115C52.5232 17.0331 52.2503 17.3355 52.0319 17.7188C51.8197 18.102 51.659 18.5362 51.5498 19.0212C51.4467 19.5003 51.3952 20.0003 51.3952 20.5213C51.3952 21.216 51.4892 21.8717 51.6772 22.4885C51.8712 23.0993 52.1623 23.5994 52.5505 23.9886C52.9446 24.3719 53.4389 24.5635 54.0332 24.5635Z"
        fill="white"
      />
      <path d="M21.6738 48.7665V38.6701H20L20.6732 36.1909H24.1845V48.7665H21.6738Z" fill="white" />
      <path
        d="M32.9829 49C32.2491 49 31.579 48.8323 30.9726 48.497C30.3661 48.1556 29.8385 47.6856 29.3898 47.0867C28.9471 46.4879 28.6044 45.7962 28.3618 45.0117C28.1193 44.2213 27.998 43.3769 27.998 42.4787C27.998 41.5804 28.1193 40.739 28.3618 39.9546C28.6044 39.1641 28.9471 38.4695 29.3898 37.8706C29.8385 37.2718 30.3661 36.8047 30.9726 36.4693C31.579 36.128 32.2491 35.9573 32.9829 35.9573C33.7167 35.9573 34.3869 36.128 34.9933 36.4693C35.5998 36.8047 36.1213 37.2718 36.5579 37.8706C37.0006 38.4695 37.3433 39.1641 37.5859 39.9546C37.8284 40.739 37.9497 41.5804 37.9497 42.4787C37.9497 43.3769 37.8284 44.2213 37.5859 45.0117C37.3433 45.7962 37.0006 46.4879 36.5579 47.0867C36.1213 47.6856 35.5998 48.1556 34.9933 48.497C34.3869 48.8323 33.7167 49 32.9829 49ZM32.9829 46.5208C33.5833 46.5208 34.0776 46.3292 34.4657 45.9459C34.8538 45.5627 35.1389 45.0627 35.3208 44.4459C35.5088 43.829 35.6028 43.1733 35.6028 42.4787C35.6028 41.7421 35.5027 41.0684 35.3026 40.4576C35.1085 39.8468 34.8174 39.3587 34.4293 38.9934C34.0412 38.6222 33.5591 38.4365 32.9829 38.4365C32.5281 38.4365 32.1339 38.5473 31.8004 38.7689C31.4729 38.9904 31.2 39.2929 30.9817 39.6761C30.7694 40.0594 30.6087 40.4935 30.4996 40.9786C30.3965 41.4577 30.3449 41.9577 30.3449 42.4787C30.3449 43.1733 30.4389 43.829 30.6269 44.4459C30.821 45.0567 31.1121 45.5567 31.5002 45.9459C31.8944 46.3292 32.3886 46.5208 32.9829 46.5208Z"
        fill="white"
      />
      <path d="M42.7241 48.7665V38.6701H41.0503L41.7234 36.1909H45.2347V48.7665H42.7241Z" fill="white" />
      <path
        d="M54.0332 49C53.2994 49 52.6293 48.8323 52.0229 48.497C51.4164 48.1556 50.8888 47.6856 50.44 47.0867C49.9973 46.4879 49.6547 45.7962 49.4121 45.0117C49.1695 44.2213 49.0482 43.3769 49.0482 42.4787C49.0482 41.5804 49.1695 40.739 49.4121 39.9546C49.6547 39.1641 49.9973 38.4695 50.44 37.8706C50.8888 37.2718 51.4164 36.8047 52.0229 36.4693C52.6293 36.128 53.2994 35.9573 54.0332 35.9573C54.767 35.9573 55.4371 36.128 56.0436 36.4693C56.65 36.8047 57.1716 37.2718 57.6082 37.8706C58.0509 38.4695 58.3936 39.1641 58.6361 39.9546C58.8787 40.739 59 41.5804 59 42.4787C59 43.3769 58.8787 44.2213 58.6361 45.0117C58.3936 45.7962 58.0509 46.4879 57.6082 47.0867C57.1716 47.6856 56.65 48.1556 56.0436 48.497C55.4371 48.8323 54.767 49 54.0332 49ZM54.0332 46.5208C54.6336 46.5208 55.1278 46.3292 55.516 45.9459C55.9041 45.5627 56.1891 45.0627 56.3711 44.4459C56.5591 43.829 56.6531 43.1733 56.6531 42.4787C56.6531 41.7421 56.553 41.0684 56.3529 40.4576C56.1588 39.8468 55.8677 39.3587 55.4796 38.9934C55.0915 38.6222 54.6093 38.4365 54.0332 38.4365C53.5784 38.4365 53.1842 38.5473 52.8506 38.7689C52.5232 38.9904 52.2503 39.2929 52.0319 39.6761C51.8197 40.0594 51.659 40.4935 51.5498 40.9786C51.4467 41.4577 51.3952 41.9577 51.3952 42.4787C51.3952 43.1733 51.4892 43.829 51.6772 44.4459C51.8712 45.0567 52.1623 45.5567 52.5505 45.9459C52.9446 46.3292 53.4389 46.5208 54.0332 46.5208Z"
        fill="white"
      />
    </svg>
  );
};
