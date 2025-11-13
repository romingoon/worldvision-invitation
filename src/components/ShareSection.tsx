'use client';

import { motion } from 'framer-motion';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface ShareSectionProps {
  url?: string;
  title?: string;
}

export function ShareSection({ url }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  // SSR 안전한 현재 URL 계산 (상태 불필요)
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');
  const imageUrl =
    'https://worldvision-invitation.vercel.app/images/thumbnail.jpg';
  const pageUrl = 'https://worldvision-invitation.vercel.app/';

  const handleKakaoShare = () => {
    if (typeof window === 'undefined') return;

    const { Kakao } = window;

    if (!Kakao || !Kakao.isInitialized()) {
      alert('카카오 SDK를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // sendDefault 사용 (커스텀 버튼)
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title:
          '한국 월드비전 창립 75주년 기념예배 \n&기념음악회 <Sound of Mission> 초대장',
        description: '2025년 11월 27일(목) 오후 6시 30분\n영락교회 베다니홀',
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: pageUrl,
          webUrl: pageUrl,
        },
      },
      buttons: [
        {
          title: '초대장 보기',
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
      ],
    });
  };

  const handleCopyLink = async () => {
    if (!currentUrl) return;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback 복사 실패:', fallbackErr);
        alert(`링크를 복사하세요: ${currentUrl}`);
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pb-24 px-6"
      style={{
        background: 'linear-gradient(to bottom right, #FFFEF7, #FFB88C)',
      }}
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-5 bg-white rounded-full shadow-lg">
              <Share2 className="w-10 h-10" style={{ color: '#FF6B35' }} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl" style={{ color: '#333333' }}>
              초대장 공유하기
            </h2>
            <p className="text-sm" style={{ color: '#666666' }}>
              소중한 분들과 이 특별한 연주회를 함께하세요
            </p>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleKakaoShare}
              className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 rounded-xl shadow-md transition-all hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.838 2.014 5.313 5 6.563v3.437l3.281-1.969C11.125 18.531 11.563 18.5 12 18.5c5.523 0 10-3.477 10-8S17.523 3 12 3z" />
              </svg>
              카카오톡으로 공유
            </Button>

            <Button
              onClick={handleCopyLink}
              className="w-full h-14 bg-white hover:opacity-90 rounded-xl shadow-md transition-all hover:shadow-lg border-2"
              style={{
                borderColor: '#FFB88C',
                color: '#333333',
              }}
            >
              {copied ? (
                <>
                  <Check
                    className="w-5 h-5 mr-3"
                    style={{ color: '#FF6B35' }}
                  />
                  링크가 복사되었습니다
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5 mr-3" />
                  링크 복사하기
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-6"
          >
            <p className="text-sm" style={{ color: '#999999' }}>
              월드비전 합창단의 여정 속으로, 여러분을 초대합니다!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
