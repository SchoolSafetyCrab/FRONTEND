/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import GroupBox from './GroupBox';
import '@styles/group/StudentFindGroup.css';
import searchGroupName from '../../../api/group/searchGroupName';
import { GroupInfo } from '../../../interfaces/GroupInfo';

interface StudentFindGroupProps {
  query: string;
}

const StudentFindGroup: React.FC<StudentFindGroupProps> = ({ query }) => {
  // eslint-disable-next-line no-unused-vars
  const [groupData, setGroupData] = useState<GroupInfo[] | null>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const data = await searchGroupName(query); // 검색 함수 호출
        setGroupData(data); // 데이터 설정
      } catch (error) {
        console.error('Error fetching group data:', error);
        setGroupData(null); // 에러 발생 시 null로 설정
      }
    };

    fetchGroupData(); // useEffect에서 한 번만 호출되도록 설정
  }, [query]); // query가 변경될 때마다 실행

  return (
    <div className="find-group-container">
      <p>{query} 검색결과</p>
      {groupData && (
        <>
          {groupData.map((group, index) => (
            <GroupBox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              schoolName={group.schoolName}
              schoolYear={group.schoolYear}
              schoolBan={group.schoolBan}
              state={group.state}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default StudentFindGroup;
