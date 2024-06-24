import React from 'react';
import MapBox from '@components/common/MapBox';
import plus from '@assets/images/group/plus.svg';
import pencil from '@assets/images/group/pencil.svg';

import '@styles/group/teacher/TeacherMap.css';

export default function TeacherMap() {
  return (
    <div className="teacher-map-section">
      <div className="add-button">
        <button type="button">
          학생 추가하기
          <img src={plus} alt="플러스" />
        </button>
      </div>
      <section className="map-section">
        <div className="circle-button">
          <img src={pencil} alt="플러스" />
        </div>
        <MapBox />
      </section>
    </div>
  );
}
