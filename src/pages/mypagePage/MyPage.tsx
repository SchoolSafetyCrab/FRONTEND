import { Route, Routes } from 'react-router-dom';
import MyPageMain from '@pages/mypage/MyPageMain';
import FindGuardianPage from '@pages/mypage/FindGuardianPage';

export default function MyPage() {
  return (
    <div className="join-container">
      <Routes>
        <Route path="/" element={<MyPageMain />} />
        <Route path="parent" element={<FindGuardianPage />} />
      </Routes>
    </div>
  );
}
