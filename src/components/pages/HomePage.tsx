import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import Image from 'next/image';
import '../../app/globals.css';
interface HomePageProps {
  title: string;
  subtitle: string;
  organizer: string;
  concertDate: string;
  concertTime1: string;
  concertTime2: string;
  venueDetail: string;
}

export function HomePage({
  title,
  subtitle,
  organizer,
  concertDate,
  concertTime1,
  concertTime2,
  venueDetail,
}: HomePageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background.png"
          className="w-full h-full object-cover"
          alt="Background"
          fill
          priority
          placeholder="blur"
          blurDataURL="image/jpeg;base64,..." // 자동 생성됨
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 mb-10"
        >
          <div className="space-y-4">
            <p
              className="text-sm text-white/95 tracking-wider"
              style={{
                color: '#FFFEF7',
                fontWeight: 600,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif",
                fontSize: 'clamp(0.85rem, 2.6vw, 1rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                letterSpacing: '0.08em',
                transform: 'rotate(-1deg)',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Main Title - Calligraphy Style */}
          <div className="px-4 py-8">
            <h1
              className={`leading-tight tracking-wide text-shadow-lg/70`}
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                fontWeight: 900,
                color: '#FFFEF7',
                letterSpacing: '0.02em',
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif",
                transform: 'rotate(-1deg)',
              }}
            >
              {title}
            </h1>
          </div>

          <div className="space-y-3 pt-4">
            <p
              className="text-base text-white/95"
              style={{
                color: '#FFFEF7',
                fontWeight: 600,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif",
                fontSize: 'clamp(0.95rem, 3vw, 1.125rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {concertDate}
            </p>
            <div
              className="text-sm text-white/90"
              style={{
                color: '#FFFEF7',
                fontWeight: 500,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif",
                fontSize: 'clamp(0.9rem, 2.6vw, 1.05rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                wordBreak: 'keep-all',
              }}
            >
              <p>{concertTime1}</p>
              <p>{concertTime2}</p>
            </div>{' '}
            <p
              className="text-sm text-white/90"
              style={{
                color: '#FFFEF7',
                fontWeight: 500,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif",
                fontSize: 'clamp(0.9rem, 2.6vw, 1.05rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {venueDetail}
            </p>
          </div>
        </motion.div>

        {/* Invitation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p
            className="text-lg text-white/95 px-8 py-3 rounded-2xl inline-block bg-black/40 backdrop-blur-[2px] shadow-lg ring-1 ring-white/10"
            style={{
              color: '#FFFEF7',
              fontWeight: 500,
              textShadow: '0 3px 14px rgba(0,0,0,0.55)',
              fontFamily: "'Nanum Myeongjo', 'Noto Serif KR', serif",
              wordBreak: 'keep-all',
            }}
          >
            월드비전과 월드비전 합창단의<br></br> 역사 속으로 초대합니다!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
