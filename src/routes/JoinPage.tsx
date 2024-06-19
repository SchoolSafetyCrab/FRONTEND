import { Route, Routes } from 'react-router-dom';

import AgreementPage from '@pages/joinPage/AgreementPage';
import JoinIdentityPage from '@pages/joinPage/JoinIdentityPage';
import JoinIdAndPwPage from '@pages/joinPage/JoinIdAndPwPage';
import JoinProfilePage from '@pages/joinPage/JoinProfilePage';
import VerificationPage from '@pages/joinPage/VerificationPage';

import '@styles/join/Join.css';

export default function JoinPage() {
  return (
    <div className="join-container">
      <Routes>
        <Route path="/" element={<AgreementPage />} />
        <Route path="identity" element={<JoinIdentityPage />} />
        <Route path="id-and-pw" element={<JoinIdAndPwPage />} />
        <Route path="profile" element={<JoinProfilePage />} />
        <Route path="verification" element={<VerificationPage />} />
      </Routes>
    </div>
  );
}
