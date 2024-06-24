import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import HomePage from '@pages/homePage/HomePage';
import MyPage from '@pages/mypagePage/MyPage';
import GroupPage from '@pages/groupPage/GroupPage';
import WayPage from '@pages/wayPage/WayPage';
import MainDeclarationBoard from '@components/main/MainDeclarationBoard';

import styles from '@styles/main/MainPage.module.css';
import Header from '../components/common/Header';
import TabBar from '../components/common/TabBar';
import findUserInfo from '../api/user/UserFindInfo';
import userInfoAtom from '../store/userInfo/UserFindInfo';

const tabs = [
  { id: 1, title: '회원정보', component: <HomePage /> },
  { id: 2, title: '안전등하굣길', component: <WayPage /> },
  { id: 3, title: '그룹조회', component: <GroupPage /> },
  { id: 4, title: '마이페이지', component: <MyPage /> },
];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await findUserInfo(); // findUserInfo 함수 호출
        if (userData) {
          setUserInfo(userData); // userData를 atom에 설정
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className={styles.mainContainer}>
      <Header title="홈" />
      <div className={styles.content}>{ActiveComponent}</div>
      <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
      <MainDeclarationBoard />
    </div>
  );
}
