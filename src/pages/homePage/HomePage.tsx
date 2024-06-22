import React from 'react';
// import ReportWhite from '@assets/images/home/report-white.svg';
import styles from '@styles/home/HomePage.module.css';
import MapBox from '../../components/common/MapBox';

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.mapContainer}>
        <MapBox />
      </section>
    </div>
  );
}
