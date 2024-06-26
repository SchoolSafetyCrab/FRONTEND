import React from 'react';
import { atom, useAtom } from 'jotai';

import '@styles/header/TeacherHeader.css';

export const activeButtonAtom = atom<string>('지도');

const TeacherHeader: React.FC = () => {
  const [activeButton, setActiveButton] = useAtom(activeButtonAtom); // useAtom 사용

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="header">
      <div className="teacher-button-header">
        <button
          type="button"
          className={activeButton === '지도' ? 'active' : ''}
          onClick={() => handleButtonClick('지도')}
        >
          지도
        </button>
        <button
          type="button"
          className={activeButton === '게시글' ? 'active' : ''}
          onClick={() => handleButtonClick('게시글')}
        >
          게시글
        </button>
      </div>
      <button type="button">그룹 만들기</button>
    </div>
  );
};

export default TeacherHeader;
