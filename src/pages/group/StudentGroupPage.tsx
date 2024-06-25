import React, { useState, useEffect, useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import SearchBar from '@components/group/student/SearchBar';
import StudentGroup from '@components/group/student/StudentGroup';
import StudentNoGroup from '@components/group/student/StudentNoGroup';
import StudentFindGroup from '@components/group/student/StudentFindGroup';
import '@styles/group/StudentGroupPage.css';
import getGroupInfo from '../../api/group/getGroupInfo';

type GroupStatus = 'inGroup' | 'noGroup' | 'searching' | null;

const groupsAtom = atom<any[]>([]);

const StudentGroupPage: React.FC = () => {
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupsInfo, setGroupsInfo] = useAtom(groupsAtom);

  const fetchGroupInfo = useCallback(async () => {
    const data = await getGroupInfo();
    if (data !== null) {
      setGroupsInfo(data);
    } else {
      setGroupsInfo([]);
    }
    console.log(groupsInfo);
  }, [setGroupsInfo]);

  useEffect(() => {
    fetchGroupInfo();
  }, [fetchGroupInfo]);

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
