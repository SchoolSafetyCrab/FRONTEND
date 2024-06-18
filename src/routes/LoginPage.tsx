import { useState } from 'react';
import LoadingPage from '@pages/Login/LoadingPage';
import LoginMainPage from '@pages/Login/LoginMainPage';
import '@styles/login/Login.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return <div className="login-container">{loading ? <LoadingPage /> : <LoginMainPage />}</div>;
}
