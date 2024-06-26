import React from 'react';
import { atom, useAtom } from 'jotai';
import MapBox from '@components/common/MapBox';
import plus from '@assets/images/group/plus.svg';
import pencil from '@assets/images/group/pencil.svg';
import '@styles/group/teacher/TeacherMap.css';
import { useNavigate } from 'react-router-dom';
import { selectedMembers } from '../../../store/group/Groupstore';
import ClickStudentTab from './ClickStudentTab';

export const addStudentAtom = atom(false); // 학생 추가하기 버튼 눌렀는지 여부를 저장

export default function TeacherMap() {
  const [, setAddStudenttState] = useAtom(addStudentAtom);
  const [selectedStudents] = useAtom(selectedMembers);

  const navigate = useNavigate();
  const writeBtnClick = () => {
    navigate('/group/teacher-write');
  };
  const handleAddStudent = () => {
    setAddStudenttState(true);
  };
  return (
    <div className="teacher-map-section">
      {selectedStudents.length === 0 ? (
        <div className="add-button">
          <button type="button" onClick={handleAddStudent}>
            학생 추가하기
            <img src={plus} alt="플러스" />
          </button>
        </div>
      ) : (
        <ClickStudentTab />
      )}
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
