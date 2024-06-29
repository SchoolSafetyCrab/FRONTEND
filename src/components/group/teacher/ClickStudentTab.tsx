import { useAtom } from 'jotai';
import profile1 from '@assets/images/profile/map/profile1.png';
import profile2 from '@assets/images/profile/map/profile2.png';
import profile3 from '@assets/images/profile/map/profile3.png';
import profile4 from '@assets/images/profile/map/profile4.png';
import profile5 from '@assets/images/profile/map/profile5.png';
import profile6 from '@assets/images/profile/map/profile6.png';
import '@styles/group/teacher/ClickStudentTab.css';
import { addStudentAtom } from './TeacherMap';
import { selectedMembers } from '../../../store/group/Groupstore';

export default function ClickStudentTab() {
  const [, setAddStudent] = useAtom(addStudentAtom);
  const [selectedStudents] = useAtom(selectedMembers);

  const addStudentOpen = () => {
    setAddStudent(true);
  };

  return (
    <div className="click-student-container">
      <div className="student-container">
        {selectedStudents.map((student) => (
          <button key={student.userId} className="click-student-btn" type="button">
            {student.iconImg === '1' && <img src={profile1} alt="이미지" />}
            {student.iconImg === '1' && <img src={profile1} alt="이미지" />}
            {student.iconImg === '2' && <img src={profile2} alt="이미지" />}
            {student.iconImg === '3' && <img src={profile3} alt="이미지" />}
            {student.iconImg === '4' && <img src={profile4} alt="이미지" />}
            {student.iconImg === '5' && <img src={profile5} alt="이미지" />}
            {student.iconImg === '6' && <img src={profile6} alt="이미지" />}

            <h1 style={{ fontSize: '1rem', color: 'black' }}>{student.nickname}</h1>
          </button>
        ))}
      </div>
      <div className="add-btn-container">
        <button type="button" onClick={addStudentOpen}>
          편집
        </button>
      </div>
    </div>
  );
}
