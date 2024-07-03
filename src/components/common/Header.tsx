import React from 'react';

import '@styles/header/Header.css';
import back from '@assets/images/mypage/backarrow.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      {title === '지도' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', zIndex: ' 1' }}>
          <button
            type="button"
            className="button"
            onClick={handleBack}
            style={{
              height: 'auto',
              width: '10%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '0',
              padding: '0',
            }}
          >
            <img src={back} alt="뒤로가기" />
          </button>
          <div style={{ height: '100%', width: '84%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3>학생 관리하기</h3>
          </div>
        </div>
      )}
      {title !== '지도' && <h1>{title}</h1>}
    </div>
  );
};

export default Header;
