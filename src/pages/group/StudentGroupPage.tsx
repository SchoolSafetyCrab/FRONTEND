import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import SearchBar from '@components/group/student/SearchBar';
import StudentGroup from '@components/group/student/StudentGroup';
import StudentNoGroup from '@components/group/student/StudentNoGroup';
import StudentFindGroup from '@components/group/student/StudentFindGroup';
import '@styles/group/StudentGroupPage.css';
import getGroupInfo from '../../api/group/getGroupInfo';
import findGroupAtom from '../../store/group/findGroupStore';

type GroupStatus = 'inGroup' | 'noGroup' | 'searching' | null;

const StudentGroupPage: React.FC = () => {
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupsInfo, setGroupsInfo] = useAtom(findGroupAtom);

  const fetchGroupInfo = async () => {
    const data = await getGroupInfo();
    if (data) {
      setGroupsInfo(data);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
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
        {groupsInfo.length !== 0 && <StudentGroup />}
        {groupsInfo.length === 0 && <StudentNoGroup />}
        {groupStatus === 'searching' && <StudentFindGroup query={searchQuery} />}
      </section>
    </div>
  );
};

export default StudentGroupPage;
