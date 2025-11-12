import localFont from 'next/font/local';

export const NanumBarunGothic = localFont({
  src: [
    {
      path: './NanumBarunGothic.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './NanumBarunGothicRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './NanumBarunGothicBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-NanumBarunGothic',
  display: 'swap',
});
