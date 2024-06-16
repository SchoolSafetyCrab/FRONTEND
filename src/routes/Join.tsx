import { Route, Routes } from 'react-router-dom';

import Agreement from '@pages/Join/Agreement';
import JoinIdentity from '@pages/Join/JoinIdentity';
import JoinIdAndPw from '@pages/Join/JoinIdAndPw';
import JoinProfile from '@pages/Join/JoinProfile';
import Verification from '@pages/Join/Verification';


export default function Join() {
  return (
    <Routes>
      <Route path="/" element={<Agreement />} />
      <Route path="identity" element={<JoinIdentity />} />
      <Route path="id-and-pw" element={<JoinIdAndPw />} />
      <Route path="profile" element={<JoinProfile />} />
      <Route path="verification" element={<Verification />} />
    </Routes>
  );
}
