import { Route, Routes } from 'react-router-dom';

import AgreementPage from '@pages/Join/AgreementPage';
import JoinIdentityPage from '@pages/Join/JoinIdentityPage';
import JoinIdAndPwPage from '@pages/Join/JoinIdAndPwPage';
import JoinProfilePage from '@pages/Join/JoinProfilePage';
import VerificationPage from '@pages/Join/VerificationPage';

export default function Join() {
  return (
    <Routes>
      <Route path="/" element={<AgreementPage />} />
      <Route path="identity" element={<JoinIdentityPage />} />
      <Route path="id-and-pw" element={<JoinIdAndPwPage />} />
      <Route path="profile" element={<JoinProfilePage />} />
      <Route path="verification" element={<VerificationPage />} />
    </Routes>
  );
}
