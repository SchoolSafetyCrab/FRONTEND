import '@styles/main/MainSafetyBoard.css';
import mainLine from '@assets/images/main/mainLine.svg';
import { useState } from 'react';
import { useAtom } from 'jotai';

import bell from '@assets/images/home/bell.svg';
import cctv from '@assets/images/home/cctv.svg';
import crosswalk from '@assets/images/home/crosswalk.svg';
import safehouse from '@assets/images/home/safehouse.svg';
import safezone from '@assets/images/home/safezone.svg';
import trafficilight from '@assets/images/home/trafficlight.svg';
import construction from '@assets/images/home/construction.svg';
import accident from '@assets/images/home/accident.svg';

import { AlarmAtom } from '../../store/home/Togglestore';

export default function MainSafetyBoard() {
  const [isSafetyVisible, setIsSafetyVisible] = useState(false);
  const [isSafetySelectBtn, setIsSafetySelectBtn] = useState(true);
  const [isAlarmSelected, setIsAlarmSelected] = useAtom(AlarmAtom);

  const handleVilbleSafety = () => {
    setIsSafetyVisible(!isSafetyVisible);
  };

  const handleSafetyBtn = () => {
    setIsSafetySelectBtn(!isSafetySelectBtn);
  };

  const handleAlarm = async () => {
    if (isAlarmSelected) console.log('알람 off');
    else console.log('알람 on');

    setIsAlarmSelected(!isAlarmSelected);
  };

  return (
    <section
      className="mainSafetyContainer"
      style={{
        transform: isSafetyVisible ? 'translateY(-80%)' : 'translateY(0)',
      }}
    >
      <div className="mainSafety">
        <button type="button" className="mainSafetyHeader" onClick={handleVilbleSafety}>
          <img src={mainLine} alt="라인" />
        </button>
        <div className="selectSafetyContainer">
          <div className="selecetSafety">
            <button
              type="button"
              onClick={handleSafetyBtn}
              style={{
                backgroundColor: isSafetySelectBtn ? '#ffffff' : 'transparent',
              }}
            >
              안전지킴이
            </button>
            <button
              type="button"
              onClick={handleSafetyBtn}
              style={{
                backgroundColor: isSafetySelectBtn ? 'transparent' : '#ffffff',
              }}
            >
              위험지역
            </button>
          </div>
        </div>
        <div className="selectIcon">
          {isSafetySelectBtn ? (
            <>
              <div className="select">
                <button type="button">
                  <img src={trafficilight} alt="신호등" />
                  <p>신호등</p>
                </button>
                <button type="button" onClick={handleAlarm}>
                  <img src={bell} alt="비상벨" />
                  <p>비상벨</p>
                </button>
                <button type="button">
                  <img src={safehouse} alt="안심집" />
                  <p>안심지킴이집</p>
                </button>
                <button type="button">
                  <img src={cctv} alt="cctv" />
                  <p>어린이방법CCTV</p>
                </button>
              </div>
              <div className="select">
                <button type="button">
                  <img src={safezone} alt="보호구역" />
                  <p>어린이보호구역</p>
                </button>
                <button type="button">
                  <img src={crosswalk} alt="횡단보도" />
                  <p>횡단보도</p>
                </button>
              </div>
            </>
          ) : (
            <>
              {' '}
              <div className="select select2">
                <button type="button">
                  <img src={accident} alt="교통사고 우발지" />
                  <p>교통사고 우발지</p>
                </button>
                <button type="button">
                  <img src={construction} alt="공사 지역" />
                  <p>공사 지역</p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
