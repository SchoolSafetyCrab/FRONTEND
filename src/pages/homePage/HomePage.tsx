import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { setDoc, doc } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import disActiveDeclarationBtn from '@assets/images/main/disActiveDeclarationButton.svg';
import MainSafetyBoard from '@components/main/MainSafetyBoard';
import activeDeclarationBtn from '@assets/images/main/activeDeclarationButton.svg';
// import ReportWhite from '@assets/images/home/report-white.svg';
import styles from '@styles/home/HomePage.module.css';
import MapBox from '../../components/common/MapBox';
import { db } from '../../firebase';

import {
  isActiveDeclarationBtnAtom,
  isBoardVisibleAtom,
  isDeclarationAtom,
} from '../../store/declaration/Declarationstore';
import pointAtom from '../../store/home/point/Pointsotre';
import userInfoAtom from '../../store/userInfo/UserFindInfo';

export default function HomePage() {
  const [, setIsBoardVisible] = useAtom(isBoardVisibleAtom);
  const [isActiveDeclarationBtn, setIsActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [isDeclaration] = useAtom(isDeclarationAtom);
  const [isStartGotoSchool, setIsStartGotoSchool] = useState(false);
  const [point, setPoint] = useAtom(pointAtom);
  const [userInfo] = useAtom(userInfoAtom);

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
    let watchId: number | undefined;

    const startWatching = () => {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setPoint({ latitude: lat, longitude: lon });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setPoint({ latitude: 0, longitude: 0 });
        },
        {
          enableHighAccuracy: true,
          timeout: 500,
          maximumAge: 0,
        },
      );
    };

    startWatching();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (userInfo.id === '') return;
    const saveMyPoint = async () => {
      console.log(userInfo.id);
      const docRef = doc(db, 'users', userInfo.id);
      const data = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      try {
        // Firestore의 'users' 컬렉션에 새로운 문서를 추가합니다.
        await setDoc(docRef, data);
      } catch (error) {
        console.error('Error adding document: ', error); // 에러가 발생하면 콘솔에 출력합니다.
      }
    };
    const saveBlockMyPoint = async () => {
      try {
        const docRef = doc(db, 'users', userInfo.id);
        const data = {
          latitude: 0,
          longitude: 0,
        };
        try {
          // Firestore의 'users' 컬렉션에 새로운 문서를 추가합니다.
          await setDoc(docRef, data);
        } catch (error) {
          console.error('Error adding document: ', error); // 에러가 발생하면 콘솔에 출력합니다.
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (isStartGotoSchool) {
      saveMyPoint();
    } else {
      saveBlockMyPoint();
    }
  }, [isStartGotoSchool, point]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.mapContainer}>
        {isActiveDeclarationBtn ? (
          <>
            <div className={styles.mainPageBtnContainer}>
              {!isStartGotoSchool ? (
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
              ) : (
                <Button
                  className="login-btn custom-button"
                  variant="primary"
                  size="lg"
                  onClick={handleStartGoToSchool}
                  style={{
                    backgroundColor: '#FF5C00',
                    color: 'white',
                    border: 'none',
                    width: '80%',
                    left: '50%',
                    zIndex: '2',
                  }}
                >
                  등하교 종료
                </Button>
              )}
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
