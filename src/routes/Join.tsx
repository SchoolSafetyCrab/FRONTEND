import { Route, Routes } from 'react-router-dom';
import Agreement from '../components/Join/Agreement';
import JoinIdentity from '../components/Join/JoinIdentity';
import JoinIdAndPw from '../components/Join/JoinIdAndPw';
import JoinProfile from '../components/Join/JoinProfile';
import Verification from '../components/Join/Verification';

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
