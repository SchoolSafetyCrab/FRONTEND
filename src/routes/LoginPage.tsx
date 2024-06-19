import { useState } from 'react';
import LoginMainPage from '@pages/loginPage/LoginMainPage';
import LoadingPage from '@pages/loginPage/LoadingPage';
import '@styles/login/Login.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return <div className="login-container">{loading ? <LoadingPage /> : <LoginMainPage />}</div>;
}
