import type { Metadata } from 'next';
import './globals.css';
import ImagePreloader from '../components/ImagePreloader';
import { Analytics } from '@vercel/analytics/next';
import KakaoScript from '../components/KakaoScript';
import BackgroundMusic from '../components/BackgroundMusic';
import { Nanum_Gothic } from 'next/font/google';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nanum-gothic',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://worldvision-invitation.vercel.app/'),
  title: '한국 월드비전 창립 75주년 기념예배&기념음악회 - Sound of Mission',
  description: '2025년 11월 27일(목) 오후 6시 30분 영락교회 베다니홀',
  openGraph: {
    title: '한국 월드비전 창립 75주년 기념예배&기념음악회 - Sound of Mission ',
    description: 'Sound of Mission',
    url: 'https://worldvision-invitation.vercel.app',
    siteName: '한국 월드비전 창립 75주년 기념예배&기념음악회',
    type: 'article',
    images: [
      {
        url: '/images/thumbnail.jpg',
        width: 800,
        height: 400,
        alt: '미리보기 이미지 설명',
      },
    ],
    locale: 'ko_KR',
    section: '연주회 프로그램북',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={nanumGothic.variable}>
      <head></head>
      <body suppressHydrationWarning>
        <ImagePreloader />
        <main className="pb-20">
          {children} <Analytics />
          <KakaoScript />
          <BackgroundMusic />
        </main>
      </body>
    </html>
  );
}
