import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import SearchBar from '@components/group/student/SearchBar';
import StudentGroup from '@components/group/student/StudentGroup';
import StudentNoGroup from '@components/group/student/StudentNoGroup';
import StudentFindGroup from '@components/group/student/StudentFindGroup';
import '@styles/group/StudentGroupPage.css';
import { groupsAtom } from '../../store/group/Groupstore';

type GroupStatus = 'inGroup' | 'noGroup' | 'searching' | null;

const StudentGroupPage: React.FC = () => {
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupsInfo] = useAtom(groupsAtom);

  useEffect(() => {
    if (groupsInfo.length > 0) {
      setGroupStatus('inGroup');
    } else {
      setGroupStatus('noGroup');
    }
  }, [groupsInfo]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setGroupStatus('searching');
  };

  return (
    <div className="student-group-wrapper">
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
