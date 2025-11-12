'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import '../../app/globals.css';
interface HomePageProps {
  title: string;
  subtitle: string;
  concertDate: string;
  concertTime1: string;
  concertTime2: string;
  venueDetail: string;
}

export function HomePage({
  title,
  subtitle,
  concertDate,
  concertTime1,
  concertTime2,
  venueDetail,
}: HomePageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden pb-10">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center pb-32">
        <Image
          src="/images/background.jpg"
          className="w-full h-full object-cover"
          alt="Background"
          fill
          priority
          placeholder="blur"
          blurDataURL="image/jpeg;base64,..." // 자동 생성됨
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
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
              className="text-content text-sm tracking-wider"
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 2.6vw, 1rem)',
                textShadow:
                  '0 2px 8px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
                letterSpacing: '0.08em',
                transform: 'rotate(-1deg)',
              }}
            >
              {title}
            </p>
          </div>

          {/* Main Title - Calligraphy Style */}
          <div className="px-4 py-8">
            <h1
              className={`leading-tight tracking-wide`}
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                transform: 'rotate(-1deg)',
                wordBreak: 'keep-all',
                maxWidth: '90vw',
                textShadow:
                  '0 3px 12px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)',
              }}
            >
              {subtitle}
            </h1>
          </div>

          <div className="space-y-3 pt-4">
            <p
              className="text-base"
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 'clamp(0.95rem, 3vw, 1.125rem)',
                textShadow:
                  '0 2px 8px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {concertDate}
            </p>
            <div
              className="text-sm"
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2.6vw, 1.05rem)',
                textShadow:
                  '0 2px 8px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
                wordBreak: 'keep-all',
              }}
            >
              <p>{concertTime1}</p>
              <p>{concertTime2}</p>
            </div>{' '}
            <p
              className="text-sm"
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2.6vw, 1.05rem)',
                textShadow:
                  '0 2px 8px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
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
            className="text-lg px-8 py-3 rounded-2xl inline-block bg-white/70 backdrop-blur-sm shadow-2xl ring-1 ring-black/20"
            style={{
              color: '#1A1410',
              fontWeight: 700,
              textShadow: '0 1px 2px rgba(255,255,255,0.8)',
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
