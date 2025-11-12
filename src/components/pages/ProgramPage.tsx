'use client';

import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { Separator } from '../../components/ui/separator';

interface ProgramItem {
  composer: string;
  songTitle: string;
  performers: string;
}

export function ProgramPage() {
  const programs: ProgramItem[] = [
    {
      composer: '이현철',
      songTitle: 'Hope for the Children',
      performers: '전체 연합',
    },
    {
      composer: '지혜정',
      songTitle: '전래동요메들리',
      performers: '월드비전 합창단 지역반 연합',
    },
    {
      composer: '이현철',
      songTitle: '사랑이 임했네',
      performers: '월드비전 합창단 연주반',
    },
    {
      composer: '지혜정 편',
      songTitle: '주는 나를 기르시는 목자요 & Amazing Grace',
      performers: '월드비전 합창단 동문합창단',
    },
    {
      composer: '이현철 편',
      songTitle: 'Sound of Music Medley',
      performers: '월드비전 합창단 연주반',
    },
    {
      composer: '이현철',
      songTitle: '왕이신 나의 하나님',
      performers: '소프라노 강혜정',
    },
    {
      composer: '이수인, 이현철 편',
      songTitle: '별 & 고향의 봄',
      performers: '월드비전 합창단 지역반 연합 & 소프라노 강혜정',
    },
    {
      composer: '이현철',
      songTitle: '태산을 넘어 험곡에 가도',
      performers: '월드비전 합창단 지역반 연합',
    },
    {
      composer: '윤학준, 최인혁 편',
      songTitle: '하늘의 사랑',
      performers: '월드비전 합창단 연주반 & 최인혁 목사',
    },
    {
      composer: '이현철',
      songTitle: 'Jubilee',
      performers: '월드비전 합창단 연합',
    },
    {
      composer: '이현철',
      songTitle: 'Pater Noster',
      performers: '전체 연합',
    },
  ];

  // 스크롤 영역 ref (추후 힌트나 무한스크롤에 사용할 수 있음)

  // 뒤로가기 버튼으로 모달 닫기 처리
  // useEffect(() => {
  //   const handlePopState = () => {
  //     if (isDialogOpen) {
  //       setIsDialogOpen(false);
  //     }
  //   };

  //   if (isDialogOpen) {
  //     // 모달이 열릴 때 history state 추가
  //     window.history.pushState({ modalOpen: true }, '');

  //     // popstate 이벤트 리스너 등록
  //     window.addEventListener('popstate', handlePopState);
  //   }

  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [isDialogOpen]);
  // // const handleLyricsClick = (item: ProgramItem) => {
  //   if (item.lyrics) {
  //     setSelectedSong(item);
  //     setIsDialogOpen(true);
  //   }
  // };

  // const handleDialogClose = (open: boolean) => {
  //   setIsDialogOpen(open);

  //   // 모달을 닫을 때 추가한 history state 제거
  //   if (!open && window.history.state?.modalOpen) {
  //     window.history.back();
  //   }
  // };

  return (
    <div
      className="min-h-screen pb-24 overflow-y-auto"
      style={{ backgroundColor: '#FFFEF7' }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6 pb-4 px-4 text-center"
        >
          <h2 className="text-2xl mb-1" style={{ color: '#333333' }}>
            연주 프로그램
          </h2>
          <p className="text-sm" style={{ color: '#666666' }}>
            Program
          </p>
        </motion.div>

        {/* Program List */}
        <div className="px-6 space-y-3">
          {programs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Entire Content with Button on Right */}
              <div className="flex items-center justify-between gap-3">
                {/* Left Side: Song Info and Performers */}
                <div className="flex-1 space-y-2">
                  {/* Song Title and Composer */}
                  <div className="flex items-start gap-2">
                    <Music2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: '#FF6B35' }}
                    />
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3
                        className="leading-snug"
                        style={{
                          color: '#222222',
                          fontSize: 'clamp(1rem, 3.5vw, 1.125rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.songTitle}
                      </h3>
                      <span
                        style={{
                          color: '#777777',
                          fontSize: 'clamp(0.72rem, 2.6vw, 0.8rem)',
                          wordBreak: 'keep-all',
                        }}
                      >
                        {item.composer}
                      </span>
                    </div>
                  </div>

                  {/* Performers */}
                  <Separator className="my-3 bg-[#F1F1F1]" />
                  <div className="flex items-center gap-2 pl-6">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: '#FFF3ED',
                        color: '#FF6B35',
                        border: '1px solid #FFD6C2',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                        flexShrink: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      연주
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm sm:text-base text-left leading-relaxed"
                        style={{
                          color: '#333333',
                          fontWeight: 500,
                          wordBreak: 'keep-all',
                        }}
                      >
                        {item.performers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
