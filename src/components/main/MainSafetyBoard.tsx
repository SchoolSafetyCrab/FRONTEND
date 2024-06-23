import '@styles/main/MainSafetyBoard.css';
import mainLine from '@assets/images/main/mainLine.svg';
import { useState } from 'react';

import bell from '@assets/images/home/bell.svg';
import cctv from '@assets/images/home/cctv.svg';
import crosswalk from '@assets/images/home/crosswalk.svg';
import safehouse from '@assets/images/home/safehouse.svg';
import safezone from '@assets/images/home/safezone.svg';
import schoolzone from '@assets/images/home/schoolzone.svg';
import trafficilight from '@assets/images/home/trafficlight.svg';
import reportWhite from '@assets/images/home/report-white.svg';
import reportYellow from '@assets/images/home/report-yellow.svg';

export default function MainSafetyBoard() {
  const [isSafetyVisible, setIsSafetyVisible] = useState(false);
  const [isSafetySelectBtn, setIsSafetySelectBtn] = useState(true);

  const handleVilbleSafety = () => {
    setIsSafetyVisible(!isSafetyVisible);
  };

  const handleSafetyBtn = () => {
    setIsSafetySelectBtn(!isSafetySelectBtn);
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
                <button type="button">
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
                  <img src={schoolzone} alt="스쿨존" />
                  <p>스쿨존</p>
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
              <div className="select">
                <button type="button">
                  <img src={reportWhite} alt="보호구역" />
                </button>
                <button type="button">
                  <img src={reportYellow} alt="스쿨존" />
                </button>
                <button type="button">
                  <img src={crosswalk} alt="횡단보도" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
