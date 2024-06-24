import React, { useState } from 'react';
import profile1 from '@assets/images/profile/profile1.svg';
import checkcircle from '@assets/images/group/checkcircle.svg';
import '@styles/group/teacher/AddStudent.css';

export default function AddStudent() {
  const [selectedStudents, setSelectedStudents] = useState<Array<number>>([]);

  const allStudentClick = () => {
    setSelectedStudents((prevState) => {
      if (prevState.length === 4) {
        return [];
      }
      return [0, 1, 2, 3];
    });
  };

  /* eslint-disable */
  const handleStudentClick = (index: number) => {
    setSelectedStudents((prevState) =>
      prevState.includes(index)
        ? prevState.filter((studentIndex) => studentIndex !== index)
        : [...prevState, index],
    );
  };

  const handleAddStudents = () => {
    console.log('클릭');
  };

  return (
    <div className="student-add-container">
      <div className="background-div" />
      <div className="add-contents">
        <div className="buttons">
          <button type="button" className="check-button" onClick={allStudentClick}>
            <img src={checkcircle} alt="체크버튼" />
            <p>전체 선택</p>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            id="button-addon2"
            onClick={handleAddStudents}
            style={{
              margin: '0',
              backgroundColor: '#35332E',
              border: 'none',
              color: '#ffffff',
              borderRadius: '20px',
              width: '80px',
            }}
          >
            추가
          </button>
        </div>
        <div className="student-div">
          <table>
            <tbody>
              <tr>
                {[0, 1, 2, 3].map((index) => (
                  <td key={index}>
                    <button
                      className={`student-btn ${selectedStudents.includes(index) ? 'selected' : ''}`}
                      type="button"
                      onClick={() => handleStudentClick(index)}
                    >
                      <img src={profile1} alt="이미지" />
                      <h1 style={{ fontSize: '1rem' }}>김민규</h1>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
