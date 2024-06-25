import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';
import userInfoAtom from '../../store/userInfo/UserFindInfo';

export default function GroupPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const info = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (info.role === 'ROLE_STUDENT') {
      setUserRole('student');
    } else if (info.role === 'ROLE_TEACHER') {
      setUserRole('teacher');
    } else {
      setUserRole('parents');
    }
  }, []);

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
