'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Navigation,
  BusFront,
  CarFront,
  TramFront,
  Loader2,
} from 'lucide-react';
import { Button } from '../ui/button';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMap } from '@/types/naver-maps';

interface LocationPageProps {
  venue: string;
  venueAddress: string;
  imageUrl: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export function LocationPage({ venue, venueAddress }: LocationPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<NaverMap | null>(null); // 지도 인스턴스 저장
  const [scriptLoaded, setScriptLoaded] = useState(false); // 스크립트 로딩 상태
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 교회 아이콘 HTML (직접 문자열로 정의)
  const churchIconHtml = `
    <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #FF6B35; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
      <svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 640 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M464.46 246.68L352 179.2V128h48c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16h-48V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v48h-48c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h48v51.2l-112.46 67.48A31.997 31.997 0 0 0 160 274.12V512h96v-96c0-35.35 28.65-64 64-64s64 28.65 64 64v96h96V274.12c0-11.24-5.9-21.66-15.54-27.44z"></path>
      </svg>
    </div>
  `;

  // 영락교회 좌표
  const CHURCH_COORDS = {
    lat: 37.56403703767878,
    lng: 126.98900394593497,
  };

  // 사용자 현재 위치 가져오기
  const getCurrentLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      // Geolocation API 지원 확인
      if (!navigator.geolocation) {
        reject(new Error('이 브라우저는 위치 서비스를 지원하지 않습니다.'));
        return;
      }

      setLocationLoading(true);
      setLocationError(null);

      const options = {
        enableHighAccuracy: true, // 높은 정확도 요청
        timeout: 10000, // 10초 타임아웃
        maximumAge: 300000, // 5분간 캐시된 위치 사용
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setUserLocation(location);
          setLocationLoading(false);
          resolve(location);
        },
        (error) => {
          setLocationLoading(false);
          let errorMessage = '';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                '위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '위치 정보를 사용할 수 없습니다.';
              break;
            case error.TIMEOUT:
              errorMessage = '위치 정보를 가져오는데 시간이 초과되었습니다.';
              break;
            default:
              errorMessage = '알 수 없는 오류가 발생했습니다.';
          }

          setLocationError(errorMessage);
          reject(new Error(errorMessage));
        },
        options
      );
    });
  };

  // iOS용 앱 실행 함수
  const openIOSApp = (appUrl: string, fallbackUrl: string) => {
    const clickedAt = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - clickedAt < 2000) {
        window.location.href = fallbackUrl;
      }
    }, 1500);
  };

  // 네이버 지도 앱으로 열기
  const handleOpenNaverMap = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      const intentUrl = `intent://place?lat=${CHURCH_COORDS.lat}&lng=${
        CHURCH_COORDS.lng
      }&name=${encodeURIComponent(
        venue
      )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

      window.location.href = intentUrl;
    } else if (isIOS) {
      const naverMapUrl = `nmap://place?lat=${CHURCH_COORDS.lat}&lng=${
        CHURCH_COORDS.lng
      }&name=${encodeURIComponent(venue)}&appname=com.example.myapp`;

      const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
      openIOSApp(naverMapUrl, appStoreUrl);
    } else {
      window.open('https://naver.me/G657fW17', '_blank');
    }
  };

  // 현재 위치에서 길찾기 (개선된 버전)
  const handleNavigationFromCurrentLocation = async () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    try {
      // 현재 위치 가져오기
      const currentLocation = userLocation || (await getCurrentLocation());

      if (isAndroid) {
        // Android: Intent URL로 현재 위치에서 길찾기
        const intentUrl = `intent://route/public?slat=${
          currentLocation.latitude
        }&slng=${currentLocation.longitude}&sname=${encodeURIComponent(
          '현재 위치'
        )}&dlat=${CHURCH_COORDS.lat}&dlng=${
          CHURCH_COORDS.lng
        }&dname=${encodeURIComponent(
          venue
        )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

        window.location.href = intentUrl;
      } else if (isIOS) {
        // iOS: 현재 위치에서 길찾기
        const naverMapUrl = `nmap://route/public?slat=${
          currentLocation.latitude
        }&slng=${currentLocation.longitude}&sname=${encodeURIComponent(
          '현재 위치'
        )}&dlat=${CHURCH_COORDS.lat}&dlng=${
          CHURCH_COORDS.lng
        }&dname=${encodeURIComponent(venue)}&appname=com.example.myapp`;

        const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
        openIOSApp(naverMapUrl, appStoreUrl);
      } else {
        // PC: 네이버 지도 웹에서 현재 위치에서 길찾기
        window.open(
          `https://map.naver.com/v5/directions/${currentLocation.longitude},${
            currentLocation.latitude
          },현재%20위치,PLACE_POI/${CHURCH_COORDS.lng},${
            CHURCH_COORDS.lat
          },${encodeURIComponent(venue)},PLACE_POI/transit`,
          '_blank'
        );
      }
    } catch (error) {
      console.error('현재 위치를 가져오는데 실패했습니다:', error);
      // 위치를 가져올 수 없을 때는 기본 길찾기 실행
      handleNavigation();
    }
  };

  // 기본 길찾기 (목적지만 지정)
  const handleNavigation = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      const intentUrl = `intent://route/public?dlat=${CHURCH_COORDS.lat}&dlng=${
        CHURCH_COORDS.lng
      }&dname=${encodeURIComponent(
        venue
      )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

      window.location.href = intentUrl;
    } else if (isIOS) {
      const naverMapUrl = `nmap://route/public?dlat=${CHURCH_COORDS.lat}&dlng=${
        CHURCH_COORDS.lng
      }&dname=${encodeURIComponent(venue)}&appname=com.example.myapp`;

      const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
      openIOSApp(naverMapUrl, appStoreUrl);
    } else {
      window.open(
        `https://map.naver.com/v5/directions/-/-/-/transit?c=${
          CHURCH_COORDS.lng
        },${CHURCH_COORDS.lat},15,0,0,0,dh&destination=${encodeURIComponent(
          venue
        )},${CHURCH_COORDS.lng},${CHURCH_COORDS.lat}`,
        '_blank'
      );
    }
  };

  // 네이버 지도 초기화
  const initializeMap = useCallback(() => {
    console.log('지도 초기화 시도...');
    console.log('mapRef.current:', mapRef.current);
    console.log('window.naver:', window.naver);

    if (!mapRef.current || !window.naver || !window.naver.maps) {
      console.error('지도 초기화 실패: 필수 조건 미충족');
      return;
    }

    // 이미 지도가 생성되어 있으면 재생성하지 않음
    if (mapInstanceRef.current) {
      console.log('지도가 이미 생성되어 있습니다.');
      return;
    }
    try {
      const location = new window.naver.maps.LatLng(
        CHURCH_COORDS.lat,
        CHURCH_COORDS.lng
      );

      const mapOptions = {
        center: location,
        zoom: 17,
        minZoom: 11, // 최소 줌 (너무 축소 방지)
        maxZoom: 18,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;
      // 교회 마커 추가
      new window.naver.maps.Marker({
        position: location,
        map: map,
        title: venue,
        icon: {
          content: churchIconHtml,
          size: new window.naver.maps.Size(100, 40),
          anchor: new window.naver.maps.Point(50, 45),
        },
      });

      // 사용자 위치가 있으면 사용자 위치 마커도 추가
      if (userLocation) {
        const userLocationLatLng = new window.naver.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        );

        new window.naver.maps.Marker({
          position: userLocationLatLng,
          map: map,
          title: '현재 위치',
          icon: {
            content: `
            <div style="
              width: 20px;
              height: 20px;
              background: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            "></div>
          `,
            size: new window.naver.maps.Size(20, 20),
            anchor: new window.naver.maps.Point(10, 10),
          },
        });
      }

      setMapLoaded(true);
      console.log('지도 초기화 완료');
    } catch (error) {
      console.error('지도 생성 중 오류 발생:', error);
    }
  }, [
    CHURCH_COORDS.lat,
    CHURCH_COORDS.lng,
    churchIconHtml,
    userLocation,
    venue,
  ]);
  // 수동으로 스크립트 로드하기 (더 안정적인 방법)
  useEffect(() => {
    // 이미 스크립트가 로드되었는지 확인
    if (window.naver && window.naver.maps) {
      console.log('네이버 지도 API가 이미 로드됨');
      setScriptLoaded(true);
      return;
    }

    // 스크립트 요소 생성
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      console.log('네이버 지도 스크립트 로드 완료');
      setScriptLoaded(true);
    };

    script.onerror = () => {
      console.error('네이버 지도 스크립트 로드 실패');
    };

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      const existingScript = document.querySelector(`script[src*="maps.js"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // 스크립트 로드 후 지도 초기화
  useEffect(() => {
    if (scriptLoaded && mapRef.current) {
      // 약간의 딜레이를 주어 DOM과 스크립트가 완전히 준비되도록 함
      const timer = setTimeout(() => {
        initializeMap();
      }, 500); // 딜레이를 늘림

      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, initializeMap]);

  // 컴포넌트 마운트 시 현재 위치 가져오기 (한 번만 실행)
  useEffect(() => {
    if ('geolocation' in navigator) {
      getCurrentLocation().catch(() => {
        console.log('현재 위치를 가져올 수 없습니다.');
      });
    }
  }, []); // 빈 배열로 한 번만 실행

  // 스크립트 로드 후 지도 초기화
  useEffect(() => {
    if (scriptLoaded && mapRef.current) {
      // 약간의 딜레이를 주어 DOM이 완전히 준비되도록 함
      const timer = setTimeout(() => {
        initializeMap();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, initializeMap]);

  // 컴포넌트 마운트 시 현재 위치 가져오기
  useEffect(() => {
    if ('geolocation' in navigator) {
      getCurrentLocation().catch(() => {
        console.log('현재 위치를 가져올 수 없습니다.');
      });
    }
  }, []);
  // 사용자 위치가 업데이트되면 지도도 다시 초기화
  useEffect(() => {
    if (mapLoaded && userLocation) {
      initializeMap();
    }
  }, [userLocation, initializeMap, mapLoaded]);

  return (
    <>
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
            <h2 className="text-2xl mb-1" style={{ color: '#333333' }}>
              오시는 길
            </h2>
            <p className="text-sm" style={{ color: '#666666' }}>
              Location
            </p>
          </motion.div>

          <div className="px-6 space-y-5">
            {/* Venue Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-sm p-6 text-white"
              style={{
                background:
                  'linear-gradient(to bottom right, #FF6B35, #FF1493)',
              }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl mb-2 font-semibold">{venue}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    {venueAddress}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Naver Map */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              {' '}
              {/* 지도 영역 */}
              <div
                ref={mapRef}
                className="w-full h-64 rounded-xl overflow-hidden bg-gray-100 relative"
              >
                {' '}
                {/* 로딩 인디케이터 */}
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="text-center">
                      <Loader2
                        className="w-8 h-8 animate-spin mx-auto mb-2"
                        style={{ color: '#FF6B35' }}
                      />
                      <p className="text-sm" style={{ color: '#666666' }}>
                        지도 로딩 중...
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#999999' }}>
                        스크립트 로드: {scriptLoaded ? '완료' : '진행 중'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* 버튼 영역 */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button
                  onClick={handleOpenNaverMap}
                  className="w-full text-white rounded-xl hover:opacity-90"
                  style={{ backgroundColor: '#FF6B35' }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  지도 열기
                </Button>
                <Button
                  onClick={handleNavigationFromCurrentLocation}
                  disabled={locationLoading}
                  className="w-full text-white rounded-xl disabled:opacity-50 hover:opacity-90"
                  style={{ backgroundColor: '#FF1493' }}
                >
                  {locationLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4 mr-2" />
                  )}
                  길찾기
                </Button>
              </div>
              {/* 기본 길찾기 버튼 (위치 권한이 없을 때를 위한 대안) */}
              {locationError && (
                <div className="mt-2">
                  <Button
                    onClick={handleNavigation}
                    variant="outline"
                    className="w-full rounded-xl hover:opacity-80"
                    style={{
                      borderColor: '#FFB88C',
                      color: '#FF6B35',
                      backgroundColor: '#FFB88C20',
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    기본 길찾기
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Getting There */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3
                className="text-base px-1"
                style={{
                  color: '#333333',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  display: 'inline-block',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
              >
                교통편
              </h3>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ backgroundColor: '#FFB88C' }}
                  >
                    <TramFront
                      className="w-5 h-5"
                      style={{ color: '#FF6B35' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1
                      className="text-xl mb-2 font-semibold"
                      style={{
                        color: '#333333',
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                      }}
                    >
                      지하철 노선 안내
                    </h1>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: '#666666',
                        wordBreak: 'keep-all',
                        lineHeight: 1.75,
                        textWrap: 'balance',
                        fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                      }}
                    >
                      -(2,3호선) 을지로3가역 하차, 12번 출구에서 도보 5분
                      <br />
                      -(3, 4호선) 충무로역 하차, 6번 출구에서 도보 10분
                      <br />
                      -(4호선) 명동역 하차, 10번 출구에서 도보 10분
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 pt-4"
                  style={{
                    borderTopColor: '#E5E5E5',
                    borderTopWidth: '1px',
                    borderTopStyle: 'solid',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ backgroundColor: '#FFB6E1' }}
                    >
                      <BusFront
                        className="w-5 h-5"
                        style={{ color: '#FF1493' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1
                        className="text-xl mb-2 font-semibold"
                        style={{
                          color: '#333333',
                          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        }}
                      >
                        버스 노선 안내
                      </h1>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: '#666666',
                          wordBreak: 'keep-all',
                          lineHeight: 1.75,
                          textWrap: 'balance',
                          fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                        }}
                      >
                        - 간선버스: 100, 105, 152, 202, 261, 408, 470, 471, 472
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: '#666666',
                          wordBreak: 'keep-all',
                          lineHeight: 1.75,
                          textWrap: 'balance',
                          fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                        }}
                      >
                        -직행버스: 1005-1, 1150, 5500, 5500-1, 5500-2, 7900,
                        8800, 9000, 9001, 9300, 9003, 9007
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: '#666666',
                          wordBreak: 'keep-all',
                          lineHeight: 1.75,
                          textWrap: 'balance',
                          fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                        }}
                      >
                        -급행버스: 8100
                      </p>

                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: '#666666',
                          wordBreak: 'keep-all',
                          lineHeight: 1.75,
                          textWrap: 'balance',
                          fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                        }}
                      >
                        -광역버스: 9401, 9401B, M4101, M4108, M4102, M5107,
                        M5115, M5121{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ backgroundColor: '#FFB88C' }}
                  >
                    <CarFront
                      className="w-5 h-5"
                      style={{ color: '#FF6B35' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-sm mb-1 font-semibold"
                      style={{ color: '#333333' }}
                    >
                      자가용
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#666666' }}
                    >
                      공연에 오시는 분들을 위해 영락교회 지하주차장이 개방되며,
                      주차비는 지원됩니다.{' '}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#666666' }}
                    >
                      방문하시는 모든 분들께 편의를 드리고자 영락교회 지하주차장
                      무료 이용이 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
