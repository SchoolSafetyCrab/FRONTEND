/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import checkcircle from '@assets/images/group/checkcircle.svg';
import getGroupMember from '../../../api/group/getGroupMember';
import { GroupMember } from '../../../interfaces/GroupMember';
import { addStudentAtom } from './TeacherMap';

import '@styles/group/teacher/AddStudent.css';

export default function AddStudent() {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [groupList, setGroupList] = useState<GroupMember[] | null>(null);
  const [, setAddStudent] = useAtom(addStudentAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGroupMember();
        console.log(response);
        if (response === null) {
          console.log('멤버가 없습니다');
        } else setGroupList(response);
        // 여기서 response를 처리하거나 상태 업데이트를 수행할 수 있습니다.
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };

    fetchData(); // async 함수를 직접 호출합니다.
  }, []);

  const allStudentClick = () => {
    setSelectedStudents((prevState) => {
      if (prevState.length === 4) {
        return [];
      }
      return [0, 1, 2, 3];
    });
  };

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

  const handleClose = () => {
    setAddStudent(false);
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
                        className={`student-btn ${selectedStudents.includes(member.userId) ? 'selected' : ''}`}
                        type="button"
                        onClick={() => handleStudentClick(member.userId)}
                      >
                        <img src={member.iconImg} alt="이미지" />
                        <h1 style={{ fontSize: '1rem' }}>{member.nickname}</h1>
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
