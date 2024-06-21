import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Button from 'react-bootstrap/Button';
import disActiveDeclarationBtn from '@assets/images/main/disActiveDeclarationBtn.svg';
import activeDeclarationBtn from '@assets/images/main/activedeclarationBtn.svg';

import HomePage from '@pages/homePage/HomePage';
import MyPage from '@pages/mypagePage/MyPage';
import GroupPage from '@pages/groupPage/GroupPage';
import WayPage from '@pages/wayPage/WayPage';
import styles from '@styles/main/MainPage.module.css';
import Header from '../components/common/Header';
import TabBar from '../components/common/TabBar';
import { isDeclarationAtom } from '../store/declaration/Declarationstore';

const tabs = [
  { id: 1, title: '회원정보', component: <HomePage /> },
  { id: 2, title: '안전등하굣길', component: <WayPage /> },
  { id: 3, title: '그룹조회', component: <GroupPage /> },
  { id: 4, title: '마이페이지', component: <MyPage /> },
];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [isActiveDeclarationBtn, setIsActiveDeclarationBtn] = useState(false);
  const [isDeclaration] = useAtom(isDeclarationAtom);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const handleDeclarationBtn = () => {
    setIsActiveDeclarationBtn(!isActiveDeclarationBtn);
  };

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className={styles.mainContainer}>
      <Header title="홈" />
      <div className={styles.content}>
        {isActiveDeclarationBtn ? (
          <div className={styles.mainPageBtnContainer}>
            <Button
              className="login-btn custom-button"
              variant="primary"
              size="lg"
              style={{
                backgroundColor: '#FFB800',
                color: 'white',
                border: 'none',
                width: '80%',
                left: '50%',
                zIndex: '2',
              }}
            >
              등하교 시작
            </Button>
          </div>
        ) : (
          <div className={styles.mainPageDeclarationBtnContainer}>
            <Button
              className="login-btn custom-button"
              variant="primary"
              size="lg"
              disabled={isDeclaration}
              style={{
                backgroundColor: '#FFB800',
                color: 'white',
                border: 'none',
                width: '80%',
                left: '50%',
                zIndex: '2',
              }}
            >
              신고하기
            </Button>
          </div>
        )}

        <div className={styles.mainPageDeclarationBtn}>
          <div>
            <Button
              className="login-btn custom-button"
              variant="primary"
              size="lg"
              onClick={handleDeclarationBtn}
              style={{
                backgroundColor: 'transparent',
                padding: '0',
                color: 'white',
                border: 'none',
                width: 'auto',
                height: 'auto',
                left: '50%',
                zIndex: '5',
              }}
            >
              {isActiveDeclarationBtn ? (
                <img src={activeDeclarationBtn} alt="신고 이미지" />
              ) : (
                <img src={disActiveDeclarationBtn} alt="신고 이미지" />
              )}
            </Button>
          </div>
        </div>

        {ActiveComponent}
      </div>
      <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
    </div>
  );
}
