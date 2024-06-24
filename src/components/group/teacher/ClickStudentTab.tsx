import profile1 from '@assets/images/profile/profile1.svg';
import '@styles/group/teacher/ClickStudentTab.css';

export default function ClickStudentTab() {
  return (
    <div className="click-student-container">
      <div className="student-container">
        {[0, 1, 2, 3].map((index) => (
          <button key={index} className="student-btn" type="button">
            <img src={profile1} alt="이미지" />
            <h1 style={{ fontSize: '1rem' }}>김민규</h1>
          </button>
        ))}
      </div>
      <div className="add-btn-container">
        <button type="button">편집</button>
      </div>
    </div>
  );
}
