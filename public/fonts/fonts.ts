import localFont from 'next/font/local';

export const NanumBarunGothic = localFont({
  src: [
    {
      path: '../public/fonts/NanumBarunGothic.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NanumBarunGothicRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NanumBarunGothicBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-NanumBarunGothic',
  display: 'swap',
});
