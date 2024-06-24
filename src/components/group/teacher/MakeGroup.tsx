import { useState, ChangeEvent } from 'react';

import '@styles/group/teacher/MakeGroup.css';

export default function MakeGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupYear, setGroupYear] = useState('');
  const [groupGrade, setGroupGrade] = useState('');
  const [groupClass, setGroupClass] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const [groupPeople, setGroupPeople] = useState('');

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleGroupYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupYear(event.target.value);
  };

  const handleGroupGradeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupGrade(event.target.value);
  };

  const handleGroupClassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupClass(event.target.value);
  };

  const handleGroupPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupPassword(event.target.value);
  };

  const handleGroupPeopleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupPeople(event.target.value);
  };

  const handleCreateGroup = async () => {
    // const groupData = {
    //   groupName,
    //   groupYear,
    //   groupGrade,
    //   groupClass,
    //   groupPassword,
    // };
    // try {
    //   const response = await createGroupAPI(groupData);
    //   if (response.success) {
    //     console.log('Group created successfully');
    //   } else {
    //     console.error('Failed to create group');
    //   }
    // } catch (error) {
    //   console.error('An error occurred while creating the group', error);
    // }
  };

  return (
    <div className="group-make-container">
      <div className="background-div" />
      <div className="contents">
        <div className="button-container">
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
            <input
              type="text"
              className="input-style"
              id="group-year"
              value={groupYear}
              onChange={handleGroupYearChange}
            />
            <h1>년</h1>
            <input
              type="text"
              className="input-style"
              id="group-grade"
              value={groupGrade}
              onChange={handleGroupGradeChange}
            />
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
              type="password"
              className="input-style"
              id="group-people"
              value={groupPeople}
              onChange={handleGroupPeopleChange}
            />
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
