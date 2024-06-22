import React from 'react';
import GroupBox from './GroupBox';
import '@styles/group/StudentFindGroup.css';

interface StudentFindGroupProps {
  query: string;
}

const StudentFindGroup: React.FC<StudentFindGroupProps> = ({ query }) => {
  return (
    <div className="find-group-container">
      {/* query를 기반으로 한 렌더링 로직 */}
      {/* <p>Search results for</p> */}
      {query}
      {/* 추가 컴포넌트 로직 */}
      <div className="row-div">
        <GroupBox />
        <GroupBox />
      </div>
      <div className="row-div">
        <GroupBox />
        <GroupBox />
      </div>
      <div className="row-div">
        <GroupBox />
        <GroupBox />
      </div>
    </div>
  );
};

export default StudentFindGroup;
