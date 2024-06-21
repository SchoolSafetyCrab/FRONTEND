import React from 'react';
import trafficlight from '@assets/images/home/trafficlight.svg';
import styles from '@styles/home/HomePage.module.css';

export default function SafeTab() {
  return (
    <div>
      <div className={styles.col}>
        <div className={styles.buttonWrap}>
          <img
            src={trafficlight}
            alt="traffic light"
            style={{
              backgroundColor: 'pink',
            }}
          />
          <span>신호등</span>
        </div>
        <div className={styles.buttonWrap}>
          <img
            src={trafficlight}
            alt="traffic light"
            style={{
              backgroundColor: 'pink',
            }}
          />
          <span>신호등</span>
        </div>
        <div className={styles.buttonWrap}>
          <img
            src={trafficlight}
            alt="traffic light"
            style={{
              backgroundColor: 'pink',
            }}
          />
          <span>신호등</span>
        </div>
        <div className={styles.buttonWrap}>
          <img
            src={trafficlight}
            alt="traffic light"
            style={{
              backgroundColor: 'pink',
            }}
          />
          <span>신호등</span>
        </div>
      </div>
    </div>
  );
}
