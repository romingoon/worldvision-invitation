'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const unmuteTimerRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // 시도: 페이지 진입 시 무음(auto-muted)으로 자동재생 → 곧바로 음소거 해제
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    audio.muted = true;

    let isMounted = true;

    audio
      .play()
      .then(() => {
        if (!isMounted) return;
        setIsPlaying(true);
        setHasInteracted(true);
        isPlayingRef.current = true;
        // 일부 브라우저 정책을 우회하기 위해 아주 짧은 지연 후 음소거 해제
        unmuteTimerRef.current = window.setTimeout(() => {
          if (audioRef.current && isMounted) {
            audioRef.current.muted = false;
          }
          unmuteTimerRef.current = null;
        }, 200);
      })
      .catch(() => {
        // 자동재생 실패 시, 사용자의 첫 상호작용을 기다림
        if (isMounted) {
          setHasInteracted(false);
        }
      });

    // 실제 오디오 상태 변화와 상태 동기화
    const onPlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // 페이지 가시성 변화 감지 (홈 버튼으로 이탈 시 음악 정지)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 페이지가 숨겨질 때 (홈 버튼, 다른 탭으로 이동 등)
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      } else {
        // 페이지로 돌아올 때 (사용자가 수동으로 끈 경우가 아니라면 재생)
        if (audioRef.current && isPlayingRef.current) {
          audioRef.current.play().catch(() => {
            // 재생 실패 시 무시
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (unmuteTimerRef.current) {
        clearTimeout(unmuteTimerRef.current);
        unmuteTimerRef.current = null;
      }
      // 컴포넌트 언마운트 시 안전 정지
      audio.pause();
    };
  }, []); // 의존성 배열을 비워서 mount/unmount 시에만 실행

  const handleFirstInteraction = async () => {
    if (!hasInteracted && audioRef.current) {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
        setHasInteracted(true);
      } catch (error) {
        console.log('자동재생 실패:', error);
      }
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        // 대기 중인 무음 해제 타이머가 있다면 취소
        if (unmuteTimerRef.current) {
          clearTimeout(unmuteTimerRef.current);
          unmuteTimerRef.current = null;
        }
        audioRef.current.pause();
        setIsPlaying(false); // 이벤트 리스너로도 동기화되지만 즉시 반영
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.log('재생 실패:', e);
        }
      }
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* 자동재생 실패 시 나타나는 작은 시작 버튼 */}
      {!hasInteracted && !isPlaying && (
        <button
          onClick={handleFirstInteraction}
          className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-full bg-white/90 shadow-md text-sm"
        >
          음악 켜기
        </button>
      )}

      {/* 음악 컨트롤 버튼 */}
      <button
        onClick={togglePlay}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80"
        aria-label={isPlaying ? '배경음악 끄기' : '배경음악 켜기'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
