import { motion } from 'framer-motion';
import { Home, Info, Calendar, MapPin } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'info', label: '연주회 소개', icon: Info },
    { id: 'program', label: '프로그램', icon: Calendar },
    { id: 'location', label: '오시는 길', icon: MapPin },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-beige/98 backdrop-blur-sm border-t border-orange/20 safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 py-3 px-2 flex flex-col items-center gap-1.5 transition-colors"
            >
              <motion.div className="relative" whileTap={{ scale: 0.92 }}>
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-orange' : 'text-gray-400'
                  }`}
                  style={isActive ? { color: '#FF6B35' } : undefined}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#FF6B35' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] transition-colors ${
                  isActive ? 'text-orange' : 'text-gray-500'
                }`}
                style={isActive ? { color: '#FF6B35' } : undefined}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
