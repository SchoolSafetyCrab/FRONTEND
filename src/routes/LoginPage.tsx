import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import LoginMainPage from '@pages/loginPage/LoginMainPage';
import LoadingPage from '@pages/loginPage/LoadingPage';
import '@styles/login/Login.css';
import userInfoAtom from '../store/userInfo/UserFindInfo';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const location = useLocation();

  useEffect(() => {
    setUserInfo({ id: '', nickName: '', userImg: '', role: '' });
  }, [location]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return <div className="login-container">{loading ? <LoadingPage /> : <LoginMainPage />}</div>;
}
