import React, { useState } from 'react';
import MapBox from '@components/common/MapBox';
import plus from '@assets/images/group/plus.svg';
import pencil from '@assets/images/group/pencil.svg';
import AddStudent from '@components/group/teacher/AddStudent';
import '@styles/group/teacher/TeacherMap.css';
import { useNavigate } from 'react-router-dom';

export default function TeacherMap() {
  const [addComponentState, setAddComponentState] = useState(false);
  const navigate = useNavigate();
  const writeBtnClick = () => {
    navigate('/group/teacher-write');
  };
  const handleAddStudent = () => {
    setAddComponentState(true);
  };
  return (
    <div className="teacher-map-section">
      {addComponentState && <AddStudent />}

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
