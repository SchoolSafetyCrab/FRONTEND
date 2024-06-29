import React, { useState, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';
import userInfoAtom from '../../store/userInfo/UserFindInfo';
import getGroupInfo from '../../api/group/getGroupInfo';
import { groupsAtom, recentGroup, groupMembers } from '../../store/group/Groupstore';
import getGroupMember from '../../api/group/getGroupMember';

export default function GroupPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const info = useAtomValue(userInfoAtom);
  const [groupsInfo, setGroupsInfo] = useAtom(groupsAtom);
  const [recentGroupInfo, setRecentGroupInfo] = useAtom(recentGroup);
  const [groupStudents, setGroupStudents] = useAtom(groupMembers);

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

  useEffect(() => {
    const fetchData = async () => {
      if (recentGroupInfo === null) return;
      try {
        const response = await getGroupMember(recentGroupInfo.groupId);
        if (response === null) {
          console.log('멤버가 없습니다');
        } else setGroupStudents(response);
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };

    fetchData(); // async 함수를 직접 호출합니다.
  }, [recentGroupInfo, setGroupStudents]);

  useEffect(() => {
    console.log('그룹 멤버를 가져왔다!: ', groupStudents); // 업데이트된 상태를 로그로 출력

    // 이후에 추가적인 로직을 수행할 수 있음
  }, [groupStudents]);

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
