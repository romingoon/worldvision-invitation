# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

2025 월드비전 합창단 기획연주를 위한 Next.js 15 기반 초대장 웹 애플리케이션입니다. 섹션 간 부드러운 스크롤 네비게이션, 배경 음악, 카카오 공유, Vercel Analytics 통합 기능이 포함된 단일 페이지 애플리케이션입니다.

**기술 스택:**
- Next.js 15 (App Router)
- React 19.2
- TypeScript 5
- Tailwind CSS 4
- Framer Motion (애니메이션)
- Radix UI 컴포넌트
- Kakao SDK (소셜 공유)

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린터 실행
npm run lint
```

## 아키텍처

### 애플리케이션 구조

애플리케이션은 **단일 페이지 스크롤 기반 네비게이션 패턴**을 사용하며 다음과 같은 주요 특징이 있습니다:

1. **메인 앱 컴포넌트** (`src/app/page.tsx`):
   - 스크롤 기반 섹션 네비게이션을 관리하는 클라이언트 사이드 컴포넌트
   - `sectionsRef`를 사용하여 모든 섹션 위치 추적
   - 스냅 포인트(`snap-y snap-mandatory`)를 활용한 부드러운 스크롤 구현
   - 스크롤 위치와 활성 네비게이션 탭 동기화
   - 연주회 데이터는 메인 컴포넌트에 중앙화되어 props로 전달

2. **섹션 기반 레이아웃**:
   - `HomePage` - 연주회 제목, 날짜, 장소가 포함된 히어로 섹션
   - `ConcertInfoPage` - 상세 연주회 정보
   - `ProgramPage` - 연주회 프로그램 상세
   - `LocationPage` - 공연장 위치 및 지도
   - `ShareSection` - 소셜 공유 버튼 (카카오, 링크 복사)

3. **고정 컴포넌트**:
   - `BottomNavigation` - 스크롤 위치를 추적하고 제어하는 하단 고정 탭 바
   - `BackgroundMusic` - 토글 제어가 가능한 자동 재생 배경 음악
   - `KakaoScript` - 소셜 공유를 위한 Kakao SDK 초기화

### 주요 디자인 패턴

**스크롤 관리:**
- 양방향 동기화: 스크롤 위치가 활성 탭을 업데이트하고, 탭 클릭이 스크롤을 트리거
- 네비게이션에 `scrollIntoView({ behavior: 'smooth' })` 사용
- 스크롤 리스너가 뷰포트 중앙에 있는 섹션 계산

**외부 통합:**
- **Kakao SDK**: `KakaoScript.tsx`에서 초기화, `.env.local`에 `NEXT_PUBLIC_KAKAO_API_KEY` 필요
- **Vercel Analytics**: 프로덕션 분석을 위해 레이아웃에 추가
- Kakao SDK 및 기타 외부 라이브러리를 위한 커스텀 타입 정의를 `src/types/`에서 사용

**스타일링 접근 방식:**
- 커스텀 유틸리티(`src/lib/utils.ts`의 `cn` 헬퍼)와 함께 Tailwind CSS 사용
- 접근 가능한 UI 컴포넌트를 위한 Radix UI 프리미티브 (`src/components/ui/`)
- Tailwind 설정에 없는 특정 디자인 값(색상, 폰트)은 인라인 스타일 사용
- 스크롤 트리거 및 인터랙션 애니메이션을 위한 Framer Motion

## 중요한 구현 세부사항

### TypeScript 설정
- 경로 별칭 `@/*`는 `./src/*`로 매핑
- `src/types/`의 커스텀 타입 정의:
  - `kakao.d.ts` - Kakao SDK window 전역 변수
  - `naver-maps.d.ts` - Naver Maps API
  - React 및 Next.js 호환성 shim

### 환경 변수
`.env.local`에 필요:
```
NEXT_PUBLIC_KAKAO_API_KEY=your_kakao_api_key
```

### 이미지 처리
- 이미지는 `public/images/`에 저장
- 히어로 이미지는 우선순위 로딩을 사용하는 Next.js `Image` 컴포넌트 사용
- 배경 음악은 `public/music/`에 저장

### 클라이언트 사이드 요구사항
모든 인터랙티브 컴포넌트는 `'use client'` 지시어 사용:
- 메인 앱 페이지
- 네비게이션 및 음악 컨트롤
- 소셜 공유 기능
- Framer Motion 애니메이션

## 코드 구조

```
src/
├── app/
│   ├── layout.tsx          # 메타데이터, 분석, 전역 스크립트가 포함된 루트 레이아웃
│   ├── page.tsx            # 섹션 오케스트레이션이 포함된 메인 앱
│   └── globals.css         # 전역 스타일
├── components/
│   ├── pages/              # 섹션 컴포넌트 (HomePage, ConcertInfoPage 등)
│   ├── ui/                 # 재사용 가능한 UI 컴포넌트 (Radix 기반)
│   ├── BackgroundMusic.tsx
│   ├── BottomNavigation.tsx
│   ├── ImagePreloader.tsx
│   ├── KakaoScript.tsx
│   └── ShareSection.tsx
├── lib/
│   ├── KakaoInitializer.tsx
│   └── utils.ts            # className 병합을 위한 cn() 유틸리티
└── types/                  # TypeScript 타입 정의
```

## 이 코드베이스 작업 가이드

**새 섹션 추가 시:**
1. `src/components/pages/`에 페이지 컴포넌트 생성
2. `page.tsx`의 `sectionsRef`에 ref와 함께 섹션 추가
3. 필요한 경우 `BottomNavigation`에 해당 탭 추가
4. 섹션에 `min-h-screen snap-start` 클래스 사용 확인

**네비게이션 수정 시:**
- `page.tsx`의 스크롤 핸들러와 탭 변경 핸들러 모두 업데이트
- 스크롤 위치와 활성 탭 간의 양방향 동기화 유지

**외부 스크립트 추가 시:**
- 적절한 전략과 함께 Next.js `Script` 컴포넌트 사용
- 필요한 경우 `src/types/`에 타입 정의 추가
- SSR 호환성을 위해 window 전역 변수 적절히 처리

**스타일링 규칙:**
- Tailwind 유틸리티를 먼저 사용
- 브랜드별 특정 값(예: 월드비전 오렌지 `#FF6B35`)에만 인라인 스타일 사용
- Tailwind의 모바일 우선 접근 방식을 사용하여 반응형 중단점 일관성 유지
- 조건부 클래스에는 `cn()` 유틸리티를 통해 `clsx`와 `twMerge` 사용
