/* eslint-disable no-alert */
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
import axios from 'axios';
// import { getToken, onMessage } from 'firebase/messaging';
import { messaging, getFCMToken, onMessage } from '../firebase'; // Firebase 초기화 모듈 가져오기
import Header from '../components/common/Header';
import TabBar from '../components/common/TabBar';
import findUserInfo from '../api/user/UserFindInfo';
import userInfoAtom from '../store/userInfo/UserFindInfo';
import API_BASE_URL from '../api/Apiconfig';
import NoWayPage from '../pages/wayPage/NoWayPage';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [, setTeacherTabAtom] = useState(1);
  const [tokens, setTokens] = useState('');

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     // .register('/public/firebase-messaging-sw.js')
    //     .then((registration) => {
    //       console.log('Service Worker registered with scope:', registration.scope);
    //     })
    //     .catch((err) => {
    //       console.error('Service Worker registration failed:', err);
    //     });
    // }

    const fetchToken = async () => {
      try {
        const currentToken = await getFCMToken(messaging, {
          vapidKey:
            'BFrW774HN8UpSzFMqCQ2npiYNZdejBUxcET7e6pY5gx1qJGchlSEC4-2BaEIsym5LitbuyrZabavU2t0E4-9Q2U',
        });
        if (currentToken) {
          console.log('토큰:: ', currentToken);
          setTokens(currentToken);
        } else {
          console.log('토큰이 없습니다.');
        }
      } catch (err) {
        console.log('토큰을 가져오는 도중 오류가 발생했습니다.', err);
      }
    };

    fetchToken();

    const unsubscribe = onMessage(messaging, (payload) => {
      if (payload.data) {
        alert(`공지사항이 왔어요!\n제목: ${payload.data.title}\n내용: ${payload.data.content}`);
        console.log('메시지를 받았습니다.', payload.data);
      } else {
        console.log('메시지를 받았습니다.', payload);
      }
    });

    // Clean-up function을 반환하여 unmount 시 cleanup을 수행할 수 있습니다.
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    const fetchAndSendToken = async () => {
      try {
        if (tokens !== '') {
          const response = await axios.post(
            `${API_BASE_URL}api/student/save/deviceToken`,
            { deviceToken: tokens },
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            },
          );

          console.log('Server response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching FCM token or sending to server:', error);
      }
    };

    fetchAndSendToken();
  }, [tokens]);

  useEffect(() => {
    setTeacherTabAtom(1);
  }, []);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await findUserInfo();
        if (userData) {
          setUserInfo(userData);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [setUserInfo]);

  const tabs = [
    { id: 1, title: '홈', component: <HomePage /> },
    {
      id: 2,
      title: '안전등하굣길',
      component: userInfo.role === 'ROLE_STUDENT' ? <WayPage /> : <NoWayPage />,
    },
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
};

export default MainPage;
