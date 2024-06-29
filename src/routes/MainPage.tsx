import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import HomePage from '@pages/homePage/HomePage';
import MyPage from '@pages/mypagePage/MyPage';
import GroupPage from '@pages/groupPage/GroupPage';
import WayPage from '@pages/wayPage/WayPage';
import MainDeclarationBoard from '@components/main/MainDeclarationBoard';
import GroupChildrenPage from '@pages/groupPage/GroupChildrenPage/GroupChildrenPage';
import styles from '@styles/main/MainPage.module.css';
import TeacherHeader from '@components/group/teacher/TeacherHeader';
import Header from '../components/common/Header';
import TabBar from '../components/common/TabBar';
import findUserInfo from '../api/user/UserFindInfo';
import userInfoAtom from '../store/userInfo/UserFindInfo';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  // eslint-disable-next-line no-unused-vars
  const [teacherTabAtom, setTeacherTabAtom] = useState(1);

  useEffect(() => {
    setTeacherTabAtom(1);
  }, []);

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

  const tabs = [
    { id: 1, title: '홈', component: <HomePage /> },
    { id: 2, title: '안전등하굣길', component: <WayPage /> },
    {
      id: 3,
      title: userInfo.role === 'ROLE_PARENTS' ? '내 자녀 조회' : '그룹조회',
      component: userInfo.role === 'ROLE_PARENTS' ? <GroupChildrenPage /> : <GroupPage />,
    },
    { id: 4, title: '마이페이지', component: <MyPage /> },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  const ActiveTitle = tabs.find((tab) => tab.id === activeTab)?.title.toString() || '홈';

  return (
    <div className={styles.mainContainer}>
      {userInfo.role === 'ROLE_TEACHER' && activeTab === 3 ? (
        <TeacherHeader />
      ) : (
        <Header title={ActiveTitle} />
      )}
      <div className={styles.content}>{ActiveComponent}</div>
      <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
      <MainDeclarationBoard />
    </div>
  );
}
