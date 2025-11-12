import { motion } from 'framer-motion';
import { Music, Heart, Info } from 'lucide-react';

interface ConcertInfoPageProps {
  title: string;
  subtitle: string;
  organizer: string;
  imageUrl?: string;
}

export function ConcertInfoPage({ title }: ConcertInfoPageProps) {
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
          className="pt-8 pb-6 px-6 text-center"
        >
          <h2
            className="font-NanumBarunGothic text-2xl mb-1"
            style={{ color: '#333333' }}
          >
            연주회 소개
          </h2>
          <p
            className="font-NanumBarunGothic text-sm"
            style={{ color: '#666666' }}
          >
            {title}
          </p>
        </motion.div>

        <div className="px-6 space-y-5">
          {/* About the Concert */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg font-NanumBarunGothic"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="p-2 rounded-lg font-NanumBarunGothic"
                style={{ backgroundColor: '#FFB88C' }}
              >
                <Music className="w-5 h-5" style={{ color: '#FF6B35' }} />
              </div>
              <h3
                className="text-lg font-NanumBarunGothic"
                style={{ color: '#333333' }}
              >
                연주회 소개
              </h3>
            </div>
            <div
              className="space-y-3.5 text-sm leading-relaxed font-NanumBarunGothic"
              style={{ color: '#333333' }}
            >
              <p>
                &lt;Sound of Mission&gt; 은 1960년, 전쟁의 상처 속에서 희망의
                노래로 시작되었던 월드비전 합창단의 여정을 돌아보고, 그 아름다운
                발자취를 함께 기억하는 시간으로 기획되었습니다. 특별히 이번
                무대에는 동문합창단이 함께하여, 여러 세대가 한마음으로 노래하고
                조화를 이루며, 월드비전 합창단의 사명과 정신을 다시금 되새기는
                뜻깊은 자리가 될 것입니다.
              </p>
            </div>
          </motion.div>
          {/* Planning Intent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 shadow-lg"
            style={{
              background: 'linear-gradient(to bottom right, #FFB88C, #FFB6E1)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#FF6B35' }}
              >
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg" style={{ color: '#333333' }}>
                초대의 글
              </h3>
            </div>
            <div
              className="space-y-3.5 text-sm leading-relaxed"
              style={{ color: '#333333' }}
            >
              <p>
                1960년, 전쟁의 잿더미 속에서 누군가는 노래로 희망을 심었습니다
              </p>
              <p>
                눈물과 아픔이 가시지 않은 땅 위에서도 작은 목소리들이 서로를
                위로하며 빛을 찾아 나섰습니다. 그 노래가 흘러, 세월을 건너,
                지금의 우리에게 닿았습니다. 그리고 이제, 또 다른 세대의
                목소리들이 그 선율을 이어 부릅니다. 과거의 숨결과 현재의 마음이
                하나 되어, 세상을 향한 사랑의 노래로 피어납니다.
              </p>
              <p>
                그 노래가 다시 여러분의 마음에도 닿기를 바랍니다. 한때
                누군가에게 희망이 되었던 그 노래가, 오늘은 여러분에게 위로가
                되기를.
              </p>
              <p>
                월드비전 합창단의 여정 속으로, <br></br>여러분을 초대합니다.
              </p>
            </div>
          </motion.div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#FFB88C' }}
              >
                <Info className="w-5 h-5" style={{ color: '#FF6B35' }} />
              </div>
              <h3 className="text-lg" style={{ color: '#333333' }}>
                안내사항
              </h3>
            </div>
            <div
              className="space-y-2 text-sm leading-relaxed"
              style={{ color: '#333333' }}
            >
              <p>- 티켓/초대권은 따로 없습니다.</p>
              <p>- 18시부터 선착순 입장합니다.</p>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-6 shadow-sm"
            style={{ backgroundColor: '#333333' }}
          >
            <p
              className="text-sm italic leading-relaxed mb-3"
              style={{ color: '#FFFEF7' }}
            >
              A Voice for the Voiceless
            </p>
            <p className="text-xs" style={{ color: '#999999' }}>
              소리낼 수 없는 아이들을 위해 노래합니다.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
