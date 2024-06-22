import React, { useState, useEffect } from 'react';
import SearchBar from '@components/group/student/SearchBar';
import StudentGroup from '@components/group/student/StudentGroup';
import StudentNoGroup from '@components/group/student/StudentNoGroup';
import StudentFindGroup from '@components/group/student/StudentFindGroup';
import '@styles/group/StudentGroupPage.css';

type GroupStatus = 'inGroup' | 'noGroup' | 'searching' | null;

const StudentGroupPage: React.FC = () => {
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // 학생 그룹 정보 조회하는 api 호출
    setGroupStatus('inGroup');
    // setGroupStatus('noGroup');
    // setGroupStatus('searching');
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setGroupStatus('searching');
  };

  return (
    <div className="group-wrapper">
      <section className="search-section">
        <SearchBar onSearch={handleSearch} />
      </section>
      <section className="component-section">
        {groupStatus === 'inGroup' && <StudentGroup />}
        {groupStatus === 'noGroup' && <StudentNoGroup />}
        {groupStatus === 'searching' && <StudentFindGroup query={searchQuery} />}
      </section>
    </div>
  );
};

export default StudentGroupPage;
