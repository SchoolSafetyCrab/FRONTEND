import React from 'react';
import { useAtom } from 'jotai';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';
import userInfoAtom from '../../store/userInfo/UserFindInfo';
import "@styles/group/GroupPage.css";
// import axios from 'axios'; // axios를 사용하여 API 호출

export default function GroupPage() {
  const [userRole] = useAtom(userInfoAtom);

  return (
    <div className="group-container">
      {userRole.role === 'ROLE_STUDENT' && <StudentGroupPage />}
      {userRole.role === 'ROLE_TEACHER' && <TeacherGroupPage />}
    </div>
  );
}
