import React, { useState } from 'react';
import HomePage from '@pages/homePage/HomePage';
import MyPage from '@pages/mypagePage/MyPage';
import GroupPage from '@pages/groupPage/GroupPage';
import WayPage from '@pages/wayPage/WayPage';
import styles from '@styles/main/MainPage.module.css';
import Header from '../components/common/Header';
import TabBar from '../components/common/TabBar';

const tabs = [
  { id: 1, title: '회원정보', component: <HomePage /> },
  { id: 2, title: '안전등하굣길', component: <WayPage /> },
  { id: 3, title: '그룹조회', component: <GroupPage /> },
  { id: 4, title: '마이페이지', component: <MyPage /> },
];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className={styles.mainContainer}>
      <Header title="홈" />
      <div className={styles.content}>{ActiveComponent}</div>
      <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
    </div>
  );
}
