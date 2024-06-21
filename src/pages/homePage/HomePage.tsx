import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReportYellow from '@assets/images/home/report-yellow.svg';
// import ReportWhite from '@assets/images/home/report-white.svg';
import styles from '@styles/home/HomePage.module.css';
import Tab from '@components/home/Tab';
import MapBox from '../../MapBox';

export default function HomePage() {
  const [go, setGo] = useState(false);

  const handleGo = () => {
    setGo(true);
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.mapContainer}>
        <MapBox />
      </section>
      <section className={styles.contentContainer}>
        <div className={styles.topContainer}>
          <div className={styles.buttonContainer}>
            <Button
              className={`${styles.loginBtn} ${styles.customButton}`}
              variant="primary"
              size="lg"
              onClick={handleGo}
            >
              {go ? '등하교중...' : '등하교 시작!'}
            </Button>
          </div>
          <div className={styles.buttonDiv}>
            <div className={styles.reportBtn}>
              <img src={ReportYellow} alt="신고하기 버튼" />
            </div>
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <Tab />
        </div>
      </section>
    </div>
  );
}
