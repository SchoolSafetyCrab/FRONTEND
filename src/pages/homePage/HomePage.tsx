import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Button from 'react-bootstrap/Button';
import disActiveDeclarationBtn from '@assets/images/main/disActiveDeclarationButton.svg';
import MainSafetyBoard from '@components/main/MainSafetyBoard';

import activeDeclarationBtn from '@assets/images/main/activeDeclarationButton.svg';
// import ReportWhite from '@assets/images/home/report-white.svg';
import styles from '@styles/home/HomePage.module.css';
import MapBox from '../../components/common/MapBox';

import {
  isActiveDeclarationBtnAtom,
  isBoardVisibleAtom,
  isDeclarationAtom,
} from '../../store/declaration/Declarationstore';
import isStartGotoSchoolAtom from '../../store/home/Homestore';
import pointAtom from '../../store/home/point/Pointsotre';
import findUserInfo from '../../api/user/userInfo';
import userInfoAtom from '../../store/userInfo/UserInfo';

export default function HomePage() {
  const [, setIsBoardVisible] = useAtom(isBoardVisibleAtom);
  const [isActiveDeclarationBtn, setIsActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [isDeclaration] = useAtom(isDeclarationAtom);
  const [isStartGotoSchool, setIsStartGotoSchool] = useAtom(isStartGotoSchoolAtom);
  const [, setPoint] = useAtom(pointAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const handleDeclarationBtn = () => {
    setIsActiveDeclarationBtn(!isActiveDeclarationBtn);
  };

  const handleDeclarationBoard = () => {
    setIsBoardVisible(true);
  };

  const handleStartGoToSchool = () => {
    setIsStartGotoSchool(!isStartGotoSchool);
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

  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도
          setPoint({ latitude: lat, longitude: lon });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setPoint({ latitude: 0, longitude: 0 });
        },
        options,
      );

      // 컴포넌트 언마운트 시 위치 감시 정리 (예시로 주석 처리)
      // return () => navigator.geolocation.clearWatch(watchId);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을 때 기본 위치로 설
      setPoint({ latitude: 0, longitude: 0 });
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.mapContainer}>
        {isActiveDeclarationBtn ? (
          <>
            <div className={styles.mainPageBtnContainer}>
              <Button
                className="login-btn custom-button"
                variant="primary"
                size="lg"
                onClick={handleStartGoToSchool}
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
            <MainSafetyBoard />
          </>
        ) : (
          <div className={styles.mainPageDeclarationBtnContainer}>
            <Button
              className="login-btn custom-button"
              variant="primary"
              size="lg"
              disabled={isDeclaration}
              onClick={handleDeclarationBoard}
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
        <MapBox />
      </section>
    </div>
  );
}
