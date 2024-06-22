import React from 'react';
import { useAtom } from 'jotai';
import Button from 'react-bootstrap/Button';
import disActiveDeclarationBtn from '@assets/images/main/disActiveDeclarationButton.svg';
import activeDeclarationBtn from '@assets/images/main/activeDeclarationButton.svg';
// import ReportWhite from '@assets/images/home/report-white.svg';
import styles from '@styles/home/HomePage.module.css';
import MapBox from '../../components/common/MapBox';

import {
  isActiveDeclarationBtnAtom,
  isBoardVisibleAtom,
  isDeclarationAtom,
} from '../../store/declaration/Declarationstore';

export default function HomePage() {
  const [, setIsBoardVisible] = useAtom(isBoardVisibleAtom);
  const [isActiveDeclarationBtn, setIsActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [isDeclaration] = useAtom(isDeclarationAtom);

  const handleDeclarationBtn = () => {
    setIsActiveDeclarationBtn(!isActiveDeclarationBtn);
  };

  const handleDeclarationBoard = () => {
    setIsBoardVisible(true);
  };
  return (
    <div className={styles.pageContainer}>
      <section className={styles.mapContainer}>
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
