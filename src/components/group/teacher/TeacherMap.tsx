import React from 'react';
import { atom, useAtom } from 'jotai';
import MapBox from '@components/common/MapBox';
import plus from '@assets/images/group/plus.svg';
import pencil from '@assets/images/group/pencil.svg';
import '@styles/group/teacher/TeacherMap.css';
import { useNavigate } from 'react-router-dom';

export const addStudentAtom = atom(false);

export default function TeacherMap() {
  const [, setAddStudenttState] = useAtom(addStudentAtom);
  const navigate = useNavigate();
  const writeBtnClick = () => {
    navigate('/group/teacher-write');
  };
  const handleAddStudent = () => {
    setAddStudenttState(true);
  };
  return (
    <div className="teacher-map-section">
      <div className="add-button">
        <button type="button" onClick={handleAddStudent}>
          학생 추가하기
          <img src={plus} alt="플러스" />
        </button>
      </div>
      <div className="circle-btn-div">
        <button type="button" className="circle-button" onClick={writeBtnClick}>
          <img src={pencil} alt="플러스" />
        </button>
      </div>
      <section className="map-section">
        <MapBox />
      </section>
    </div>
  );
}
