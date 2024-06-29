import React from 'react';
import { GroupInfo } from 'interfaces/GroupInfo';
import School from '@assets/images/group/school.svg';
import '@styles/group/ActiveGroup.css';
import Message from './Message';

interface ActiveGroupProps {
  group: GroupInfo;
}

const ActiveGroup: React.FC<ActiveGroupProps> = ({ group }) => {
  return (
    <button type="button" className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{group.schoolName}</h3>
        </div>
        <h1>{`${group.schoolYear}학년 ${group.schoolBan}반`}</h1>
        <div className="message-div">
          <Message key={1} title="rr" detail="Rr" startDate={new Date(2024, 5, 29)} />
          <Message key={1} title="rr" detail="Rr" startDate={new Date(2024, 5, 29)} />
          <Message key={1} title="rr" detail="Rr" startDate={new Date(2024, 5, 29)} />
          <Message key={1} title="rr" detail="Rr" startDate={new Date(2024, 5, 29)} />
          <Message key={1} title="rr" detail="Rr" startDate={new Date(2024, 5, 29)} />
        </div>
      </div>
    </button>
  );
};

export default ActiveGroup;
