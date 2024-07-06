import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import MainSafetyBoard from '@components/main/MainSafetyBoard';
import WayMapBox from '../../components/common/WayMapBox';
import '@styles/way/WayPage.css';
import { WayAtom, WayAddAtom, WayAddEndAtom, buttonAtom } from '../../store/way/WayInfo';
import deleteSchoolWay from '../../api/way/DeleteSchoolWay';

export default function WayPage() {
  // 나의 등교길 관련
  const [ways] = useAtom(WayAtom);
  const [, setIsWayAdd] = useAtom(WayAddAtom);
  const [, setIsWayEnd] = useAtom(WayAddEndAtom);
  const [buttonConfig, setButtonConfig] = useState({
    text: '추가',
    style: { backgroundColor: '#FFB800' },
  });
  const [buttonState, setButtonState] = useAtom(buttonAtom);

  useEffect(() => {
    if (ways.length !== 0) {
      console.log('WAYS 찍기:', ways);
    }
  }, [ways]);

  const deleteWayApi = async () => {
    const response = await deleteSchoolWay();
    console.log('삭제되었을 때 메시지: ', response);
    setButtonState(0);
    window.location.reload();
  };

  const handleDeleteWay = () => {
    const confirmed = window.confirm('등굣길을 삭제하시겠습니까?');
    if (confirmed) {
      deleteWayApi();
    }
  };

  const handleAddEndOk = () => {
    const confirmed = window.confirm('등굣길을 저장하시겠습니까?');
    if (confirmed) {
      setButtonState(2);
      setIsWayEnd(true);

      setIsWayAdd(false);
    }
  };

  const handleAddState = () => {
    if (buttonState === 0) {
      // 등교길 추가 전
      console.log('추가전의 등굣길 상태: ', ways);
      setButtonState(1);
      setIsWayAdd(true);
    } else if (buttonState === 1) {
      // 등교길 편집 중
      console.log('편집중의 등굣길 상태: ', ways);
      handleAddEndOk();
    } else if (buttonState === 2) {
      // 등굣길 추가된 이후
      console.log('추가한 결과: ', ways);
      handleDeleteWay();
    }
    // if (ways.length > 0 && isWayAdd) {
    //   setIsWayAdd(false);
    // }
  };

  useEffect(() => {
    if (buttonState === 0) {
      setButtonConfig({
        text: '추가',
        style: { backgroundColor: '#FFB800' },
      });
    } else if (buttonState === 1) {
      setButtonConfig({
        text: '완료',
        style: { backgroundColor: '#64DFFF' },
      });
    } else if (buttonState === 2) {
      setButtonConfig({
        text: '삭제',
        style: { backgroundColor: '#FF5C00' },
      });
    }
  }, [buttonState]);

  // useEffect(() => {
  //   console.log('way 상태찍기: ', ways);
  // }, [ways, isWayAdd]);

  const buttonStyle = {
    ...buttonConfig.style,
    margin: '0',
    zIndex: '2',
    border: 'none',
    color: '#ffffff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '1.2rem',
  };

  return (
    <div className="waypage-container">
      <section className="button-section">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          id="button-addon2"
          onClick={handleAddState}
          style={buttonStyle}
        >
          {buttonConfig.text}
        </button>
      </section>
      <section className="map-section">
        <MainSafetyBoard />
        <WayMapBox />
      </section>
    </div>
  );
}
