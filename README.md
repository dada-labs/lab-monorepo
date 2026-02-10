# Dada Lab (다다랩)

학습한 코드와 기술 스택을 체계적으로 구조화하여 기록하는 개인용 코딩 아카이빙 플랫폼입니다.

---

## System Architecture

다다랩은 Turborepo 기반의 모노레포 구조로 설계되어, 서비스 간 코드 공유를 극대화하고 독립적인 배포 파이프라인을 운영합니다.

- apps/web (Next.js): 일반 사용자용 서비스. SEO 최적화 및 빠른 렌더링을 위해 Next.js App Router를 채택했습니다.

- apps/admin (React + Vite): 관리자용 대시보드. 빠른 빌드와 가벼운 실행 환경을 위해 Vite를 기반으로 구축되었습니다.

- apps/api (Backend): 전체 서비스의 데이터 비즈니스 로직 및 CRUD를 담당하는 백엔드 서버입니다.

- packages/shared: UI 컴포넌트, 공용 Types, 유틸리티 함수 등을 공유하여 개발 생산성을 높였습니다.

---

## Tech Stack

### Frameworks & Languages

분류,기술 스택

- Monorepo : "Turborepo"
- Frontend (Web) : "Next.js (App Router), Tailwind CSS"
- Frontend (Admin) :"React, Vite, Tailwind CSS"
- Backend: "Node.js, Express, TypeScript"
- Infrastructure : "Vercel (Web/Admin), Render (API)"

### State & Library

- State Management: Zustand (+ persist 미들웨어를 통한 UI 상태 유지)
- Data Fetching: React Query (서버 상태 동기화 및 캐싱)
- Editor: React-Quill (Rich Text 기반 Editor)
- Storage: Cloudinary (이미지 썸네일 및 첨부파일 관리)

---

## Key Features & Technical Points

### SEO & Dynamic Metadata (apps/web)

콘텐츠의 가시성을 높이기 위해 Next.js의 generateMetadata를 활용한 동적 메타데이터 시스템을 구축했습니다.

- **Dynamic OG Tag**: 각 아카이브의 제목과 Cloudinary에 저장된 썸네일 주소를 결합하여 실시간으로 Open Graph 메타 태그를 생성합니다.

- 공유 최적화: 카카오톡, 슬랙 등 소셜 미디어 공유 시 콘텐츠의 실제 이미지가 노출되어 클릭률과 사용자 경험을 개선했습니다.

### 코드 아카이빙 및 멀티미디어 관리

- **Rich Text Editor**: React-Quill을 커스텀하여 단순 텍스트가 아닌 하이라이팅된 코드와 정돈된 문서를 작성합니다.

- **Cloud Storage**: Cloudinary API를 연동하여 이미지와 첨부파일을 효율적으로 업로드하고 관리합니다.

---

## Technical Challenge Review

- **SEO와 동적 데이터**: Next.js App Router 환경에서 서버 사이드에서 데이터를 페칭하여 메타데이터를 동적으로 주입하는 과정을 최적화했습니다.

- **모노레포 환경 구축**: 서비스별로 상이한 빌드 도구(Next.js, Vite)를 하나의 레포지토리에서 관리하며 공통 설정을 공유하는 경험을 쌓았습니다.
