import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/mypage/Profile.css';

import profile1 from '@assets/images/profile/profile1.svg';
import profile2 from '@assets/images/profile/profile2.svg';
import profile3 from '@assets/images/profile/profile3.svg';
import profile4 from '@assets/images/profile/profile4.svg';
import profile5 from '@assets/images/profile/profile5.svg';
import profile6 from '@assets/images/profile/profile6.svg';
import getUserInfo from '../../api/user/UserFindInfo';
import getGroupInfo from '../../api/group/getGroupInfo';
import { GroupInfo } from '../../interfaces/GroupInfo';

interface UserInfo {
  nickName: string;
  userImg: string;
  role: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [groupData, setGroupData] = useState<GroupInfo[] | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await getUserInfo();
      setUserInfo(userData);
    };

    const fetchGroupData = async () => {
      const data = await getGroupInfo();
      setGroupData(data);
    };

    fetchUserInfo();
    fetchGroupData();
  }, []);

  const handleProfile = () => {
    navigate('/mypage/setting');
  };

  return (
    <div className="profile-wrapper">
      <div className="img-wrapper">
        {userInfo?.userImg === '1' && <img src={profile1} alt={userInfo?.nickName} />}
        {userInfo?.userImg === '2' && <img src={profile2} alt={userInfo?.nickName} />}
        {userInfo?.userImg === '3' && <img src={profile3} alt={userInfo?.nickName} />}
        {userInfo?.userImg === '4' && <img src={profile4} alt={userInfo?.nickName} />}
        {userInfo?.userImg === '5' && <img src={profile5} alt={userInfo?.nickName} />}
        {userInfo?.userImg === '6' && <img src={profile6} alt={userInfo?.nickName} />}
      </div>
      <div className="name-wrapper">
        <h2>{userInfo?.nickName || '로딩 중...'}</h2>
        <p>
          {groupData && groupData.length > 0
            ? `${groupData[groupData.length - 1].schoolName} ${groupData[groupData.length - 1].schoolYear}학년 ${groupData[groupData.length - 1].schoolBan}반`
            : '로딩 중...'}
        </p>
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
