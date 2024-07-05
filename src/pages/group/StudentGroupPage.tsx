import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import SearchBar from '@components/group/student/SearchBar';
import StudentGroup from '@components/group/student/StudentGroup';
import StudentNoGroup from '@components/group/student/StudentNoGroup';
import StudentFindGroup from '@components/group/student/StudentFindGroup';
import '@styles/group/StudentGroupPage.css';
import userInfoAtom from '../../store/userInfo/UserFindInfo';

import getGroupInfo from '../../api/group/getGroupInfo';
import findGroupAtom from '../../store/group/findGroupStore';

const StudentGroupPage: React.FC = () => {
  const [groupStatus, setGroupStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupsInfo, setGroupsInfo] = useAtom(findGroupAtom);
  const [userRole] = useAtom(userInfoAtom);

  const fetchGroupInfo = async () => {
    const data = await getGroupInfo();
    if (data) {
      setGroupsInfo(data);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery.length !== 0) {
      setGroupStatus(true);
    } else {
      setGroupStatus(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleInputChange = (value: string) => {
    setGroupStatus(value.length !== 0);
  };

  return (
    <div className="student-group-wrapper">
      <section className="search-section" style={{ display: userRole.role === 'ROLE_TEACHER' ? 'none' : 'block' }}>
        <SearchBar onSearch={handleSearch} onInputChange={handleInputChange} />
      </section>
      <section className="component-section">
        {!groupStatus && groupsInfo.length !== 0 && <StudentGroup />}
        {!groupStatus && groupsInfo.length === 0 && <StudentNoGroup />}
        {groupStatus && <StudentFindGroup query={searchQuery} />}
      </section>
    </div>
  );
};

export default StudentGroupPage;
