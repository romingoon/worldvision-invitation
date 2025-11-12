import type { Metadata } from 'next';
import './globals.css';
import ImagePreloader from '../components/ImagePreloader';
import { Analytics } from '@vercel/analytics/next';
import KakaoScript from '../components/KakaoScript';
import BackgroundMusic from '../components/BackgroundMusic';

export const metadata: Metadata = {
  metadataBase: new URL('https://worldvision-invitation.vercel.app/'),
  title: '2025 월드비전 합창단 기획연주 - Sound of Mission',
  description: '2025년 11월 27일(목) 오후 6시 30분 영락교회 베다니홀',
  openGraph: {
    title: '2025 월드비전 합창단 기획연주 - Sound of Mission ',
    description: 'Sound of Mission',
    url: 'https://worldvision-invitation.vercel.app',
    siteName: '2025 월드비전 합창단 기획연주',
    type: 'article',
    images: [
      {
        url: '/images/thumnail.jpg',
        width: 1200,
        height: 630,
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
    <html lang="ko">
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
