import { useState } from 'react';
// import LoginMain from './../components/Login/LoginMain';
import Loading from '../pages/Login/Loading';
import LoginMain from '../pages/Login/LoginMain';
import './Login.css';

export default function Login() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return <div className="login-container">{loading ? <Loading /> : <LoginMain />}</div>;
}
