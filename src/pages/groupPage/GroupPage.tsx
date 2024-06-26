import React, { useState, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';
import userInfoAtom from '../../store/userInfo/UserFindInfo';
import getGroupInfo from '../../api/group/getGroupInfo';
import { groupsAtom, recentGroup } from '../../store/group/Groupstore';

export default function GroupPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const info = useAtomValue(userInfoAtom);
  const [groupsInfo, setGroupsInfo] = useAtom(groupsAtom);
  const [, setRecentGroupInfo] = useAtom(recentGroup);

  useEffect(() => {
    if (info.role === 'ROLE_STUDENT') {
      setUserRole('student');
    } else if (info.role === 'ROLE_TEACHER') {
      setUserRole('teacher');
    } else {
      setUserRole('parents');
    }
  }, [info]);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const data = await getGroupInfo();
      if (data !== null) {
        setGroupsInfo(data);
      } else {
        setGroupsInfo([]);
      }
    };

    fetchGroupInfo();
  }, [setGroupsInfo]);

  useEffect(() => {
    const num = groupsInfo.length;
    if (num > 0) {
      setRecentGroupInfo(groupsInfo[num - 1]);
    }
  }, [groupsInfo]);

  if (userRole === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="group-container" style={{ height: '100%', overflow: 'hidden' }}>
      {userRole === 'student' && <StudentGroupPage />}
      {userRole === 'teacher' && <TeacherGroupPage />}
      {userRole !== 'student' && userRole !== 'teacher' && <div>권한이 없습니다.</div>}
    </div>
  );
}
