/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import checkcircle from '@assets/images/group/checkcircle.svg';
import profile1 from '@assets/images/profile/map/profile1.png';
import profile2 from '@assets/images/profile/map/profile2.png';
import profile3 from '@assets/images/profile/map/profile3.png';
import profile4 from '@assets/images/profile/map/profile4.png';
import profile5 from '@assets/images/profile/map/profile5.png';
import profile6 from '@assets/images/profile/map/profile6.png';

// import { GroupMember } from '../../../interfaces/GroupMember';
import { groupMembers, selectedMembers } from '../../../store/group/Groupstore';

import '@styles/group/teacher/AddStudent.css';

export default function AddStudent() {
  const [groupList] = useAtom(groupMembers);
  const [tempSelectedStudents, setTempSelectedStudents] = useState<number[]>([]);
  const [selectedStudents, setSelectedStudents] = useAtom(selectedMembers);

  useEffect(() => {
    console.log('추가된 멤버들:', selectedStudents);
  }, [selectedStudents]); // selectedStudents 상태가 변경될 때마다 useEffect 실행

  const allStudentClick = () => {
    setTempSelectedStudents((prevState) => {
      if (prevState.length === groupList.length) {
        return [];
      }
      return groupList.map((member) => member.userId);
    });
  };

  const handleStudentClick = (index: number) => {
    setTempSelectedStudents((prevState) =>
      prevState.includes(index)
        ? prevState.filter((studentIndex) => studentIndex !== index)
        : [...prevState, index],
    );
  };

  const handleAddStudents = () => {
    const selected = groupList.filter((member) => tempSelectedStudents.includes(member.userId));
    setSelectedStudents(selected);
  };

  const handleClose = () => {};

  return (
    <div className="student-add-container">
      <div className="background-div" />
      <div className="add-contents">
        <div className="buttons">
          <button type="button" className="check-button" onClick={allStudentClick}>
            <img src={checkcircle} alt="체크버튼" />
            <p>전체 선택</p>
          </button>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              id="button-addon2"
              onClick={handleClose}
              style={{
                margin: '0',
                backgroundColor: '#dddddd',
                border: 'none',
                color: '#ffffff',
                borderRadius: '20px',
                width: '80px',
              }}
            >
              취소
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
        </div>
        <div className="student-div">
          <table>
            <tbody>
              <tr>
                {groupList &&
                  groupList.map((member) => (
                    <td key={member.userId}>
                      <button
                        className={`student-btn ${
                          tempSelectedStudents.includes(member.userId) ? 'selected' : ''
                        }`}
                        type="button"
                        onClick={() => handleStudentClick(member.userId)}
                      >
                        {member.iconImg === '1' && <img src={profile1} alt="이미지" />}
                        {member.iconImg === '2' && <img src={profile2} alt="이미지" />}
                        {member.iconImg === '3' && <img src={profile3} alt="이미지" />}
                        {member.iconImg === '4' && <img src={profile4} alt="이미지" />}
                        {member.iconImg === '5' && <img src={profile5} alt="이미지" />}
                        {member.iconImg === '6' && <img src={profile6} alt="이미지" />}

                        <h1 style={{ fontSize: '0.6rem', color: 'black' }}>{member.nickname}</h1>
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
