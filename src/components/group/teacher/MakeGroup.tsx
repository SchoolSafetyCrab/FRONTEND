import { useState, ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { createGroupApi, CreateGroupInfo } from '../../../api/group/createGroupApi';
import { activeMakeGroupAtom } from './TeacherHeader';

import '@styles/group/teacher/MakeGroup.css';

export default function MakeGroup() {
  const [groupName, setGroupName] = useState('');
  // const [groupYear, setGroupYear] = useState('');
  const [groupGrade, setGroupGrade] = useState(1);
  const [groupClass, setGroupClass] = useState(1);
  const [groupPassword, setGroupPassword] = useState('');
  const [groupPeople, setGroupPeople] = useState(20);
  const [, setMakeGroupStatus] = useAtom(activeMakeGroupAtom);

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  // const handleGroupYearChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setGroupYear(event.target.value);
  // };

  const handleGroupGradeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGroupGrade(Number(event.target.value));
  };

  const handleGroupClassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupClass(Number(event.target.value));
  };

  const handleGroupPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupPassword(event.target.value);
  };

  const handleGroupPeopleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupPeople(Number(event.target.value));
  };
  const handleCreateGroup = async () => {
    const groupData: CreateGroupInfo = {
      schoolName: groupName,
      schoolYear: groupGrade,
      schoolBan: groupClass,
      userNum: groupPeople,
      groupCode: groupPassword,
    };
    try {
      const response = await createGroupApi(groupData);
      if (response) {
        console.log('Group created successfully');
      } else {
        console.error('Failed to create group');
      }
    } catch (error) {
      console.error('An error occurred while creating the group', error);
    }
    setMakeGroupStatus(false);
  };

  const handleClose = () => {
    setMakeGroupStatus(false);
  };
  return (
    <div className="group-make-container">
      <div className="background-div">
        <div className="contents">
          <div className="button-container">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              id="button-addon2"
              onClick={handleClose}
              style={{
                margin: '0',
                zIndex: '2',
                backgroundColor: '#dddddd',
                border: 'none',
                color: '#000000',
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
              onClick={handleCreateGroup}
              style={{
                margin: '0',
                zIndex: '2',
                backgroundColor: '#FFB800',
                border: 'none',
                color: '#ffffff',
                borderRadius: '20px',
                width: '80px',
              }}
            >
              만들기
            </button>
          </div>
          <div className="group-div">
            <h1 style={{ fontSize: '1rem' }}>그룹 이름</h1>
            <input
              type="text"
              className="input-style"
              id="group-name"
              value={groupName}
              onChange={handleGroupNameChange}
            />
            <div className="group-inside-div">
              {/* <input
                type="text"
                className="input-style"
                id="group-year"
                value={groupYear}
                onChange={handleGroupYearChange}
              />
              <h1>년</h1> */}
              <select
                name="color"
                className="input-style"
                value={groupGrade}
                onChange={handleGroupGradeChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>

              {/* <input
                type="text"
                className="input-style"
                id="group-grade"
                value={groupGrade}
                onChange={handleGroupGradeChange}
              /> */}
              <h1>학년</h1>
              <input
                type="text"
                className="input-style"
                id="group-class"
                value={groupClass}
                onChange={handleGroupClassChange}
              />
              <h1>반</h1>
            </div>
            <div className="h1-wrapper">
              <h1 style={{ fontSize: '1rem', width: '50%' }}>비밀번호</h1>
              <h1 style={{ fontSize: '1rem' }}>인원제한</h1>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-style"
                id="group-password"
                value={groupPassword}
                onChange={handleGroupPasswordChange}
              />
              <input
                type="text"
                className="input-style"
                id="group-people"
                value={groupPeople}
                onChange={handleGroupPeopleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// async function createGroupAPI(groupData: {
//   groupName: string;
//   groupYear: string;
//   groupGrade: string;
//   groupClass: string;
//   groupPassword: string;
// }) {
//   // API 호출을 위한 틀 (여기서는 예제입니다)
//   const response = await fetch('/api/group/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(groupData),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create group');
//   }

//   return response.json();
// }
