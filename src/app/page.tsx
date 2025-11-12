'use client';

import { useState, useRef, useEffect } from 'react';
import { BottomNavigation } from '../components/BottomNavigation';
import { HomePage } from '../components/pages/HomePage';
import { ConcertInfoPage } from '../components/pages/ConcertInfoPage';
import { ProgramPage } from '../components/pages/ProgramPage';
import { LocationPage } from '../components/pages/LocationPage';
import { ShareSection } from '../components/ShareSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    info: null,
    program: null,
    location: null,
    share: null,
  });

  const concertData = {
    title: '한국 월드비전 창립 75주년\n기념예배&기념음악회',
    subtitle: 'Sound of Mission',
    organizer: '월드비전',
    concertDate: '2025년 11월 27일(목)',
    concertTime1: '오후 6시 30분 기념예배',
    concertTime2: '오후 7시 30분 기념음악회',
    venue: '영락교회',
    venueDetail: '영락교회 베다니홀',
    venueAddress: '서울시 중구 수표로 33(저동2가) \n영락교회 50주년 기념관 B3',
    venueImage:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191207_200%2F1575645003467FPzEl_JPEG%2Fy7NcXhRAN3M-rgQCsjWM4WE0.jpg',
  };

  // Handle scroll to update active tab
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + window.innerHeight / 2;

      // Find which section is currently in view
      const sections = Object.entries(sectionsRef.current);
      for (const [key, element] of sections) {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveTab(key);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle tab change to scroll to section
  const handleTabChange = (tab: string) => {
    const element = sectionsRef.current[tab];
    if (element && scrollContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(tab);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory"
      >
        {/* Home Section */}
        <section
          ref={(el) => {
            sectionsRef.current.home = el;
          }}
          className="min-h-screen snap-start"
        >
          <HomePage
            title={concertData.title}
            subtitle={concertData.subtitle}
            concertDate={concertData.concertDate}
            concertTime1={concertData.concertTime1}
            concertTime2={concertData.concertTime2}
            venueDetail={concertData.venueDetail}
          />
        </section>

        {/* Concert Info Section */}
        <section
          ref={(el) => {
            sectionsRef.current.info = el;
          }}
          className="min-h-screen snap-start"
        >
          <ConcertInfoPage
            title={concertData.title}
            subtitle={concertData.subtitle}
            organizer={concertData.organizer}
          />
        </section>

        {/* Program Section */}
        <section
          ref={(el) => {
            sectionsRef.current.program = el;
          }}
          className="min-h-screen snap-start"
        >
          <ProgramPage />
        </section>

        {/* Location Section */}
        <section
          ref={(el) => {
            sectionsRef.current.location = el;
          }}
          className="min-h-screen snap-start"
        >
          <LocationPage
            venue={concertData.venue}
            venueAddress={concertData.venueAddress}
            venueDetail={concertData.venueDetail}
            imageUrl={concertData.venueImage}
          />
        </section>

        {/* Share Section */}
        <section
          ref={(el) => {
            sectionsRef.current.share = el;
          }}
          className="snap-start"
        >
          <ShareSection title={concertData.title} />
        </section>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
