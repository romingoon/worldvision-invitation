import type { Metadata } from 'next';
import './globals.css';
import ImagePreloader from '../components/ImagePreloader';
import { Analytics } from '@vercel/analytics/next';
import KakaoScript from '../components/KakaoScript';
import BackgroundMusic from '../components/BackgroundMusic';

const nanumBarunGothic = {
  style: {
    fontFamily:
      "'Nanum Barun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

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
    <html lang="ko">
      <head>
        {/* 로컬 폰트 프리로드 - 카카오톡 인앱브라우저 호환 */}
        <link
          rel="preload"
          href="/fonts/NanumBarunGothicRegular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NanumBarunGothicBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body style={nanumBarunGothic.style} suppressHydrationWarning>
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
