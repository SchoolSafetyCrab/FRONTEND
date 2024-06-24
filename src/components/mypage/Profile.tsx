import { useState, useEffect } from 'react';
import ProfileImg from '@assets/images/profile/profile1.svg';
import { useNavigate } from 'react-router-dom';
import '@styles/mypage/Profile.css';
import getUserInfo from '../../api/user/userInfo';

interface UserInfo {
  nickName: string;
  userImg: string;
  role: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await getUserInfo();
      setUserInfo(userData);
    };

    console.log(userInfo);
    fetchUserInfo();
  }, []);

  const handleProfile = () => {
    navigate('/mypage/setting');
  };

  return (
    <div className="profile-wrapper">
      <div className="img-wrapper">
        <img src={userInfo?.userImg || ProfileImg} alt="프로필 이미지" />
      </div>
      <div className="name-wrapper">
        <h2>{userInfo?.nickName || '로딩 중...'}</h2>
        <p>{userInfo ? '한밭초등학교 5학년 2반' : '로딩 중...'}</p>
      </div>
      <div className="btn-wrapper">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          id="button-addon2"
          onClick={handleProfile}
          style={{
            margin: '0',
            zIndex: '2',
            backgroundColor: '#FFB800',
            border: 'none',
            color: '#ffffff',
            borderRadius: '20px',
          }}
        >
          프로필 설정
        </button>
      </div>
    </div>
  );
}
