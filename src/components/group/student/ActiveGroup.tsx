import React from 'react';
import { useAtom } from 'jotai';
import { groupsAtom } from '@pages/group/StudentGroupPage';
import School from '@assets/images/group/school.svg';
import Message from './Message';
import '@styles/group/ActiveGroup.css';

export default function ActiveGroup() {
  const [groupsInfo] = useAtom(groupsAtom);

  if (groupsInfo.length === 0) {
    return null; // 그룹 정보가 없을 경우 아무것도 렌더링하지 않음
  }

  const firstGroup = groupsInfo[0]; // 첫 번째 그룹 정보

  return (
    <div className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{firstGroup.schoolName}</h3>
        </div>
        <h1>{`${firstGroup.schoolYear}학년 ${firstGroup.schoolBan}반`}</h1>
      </div>
      <div className="message-div">
        <Message />
      </div>
    </div>
  );
}
