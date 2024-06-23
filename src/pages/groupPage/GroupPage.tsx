import React, { useState, useEffect } from 'react';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';
// import axios from 'axios'; // axios를 사용하여 API 호출

export default function GroupPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 유저 정보를 가져오는 API 호출
    // const fetchUserRole = async () => {
    //   try {
    //     const response = await axios.get('/api/user-info'); // 실제 API 엔드포인트로 변경
    //     const { role } = response.data; // role 값을 받아옴 (예: 'student' 또는 'teacher')
    //     setUserRole(role);
    //   } catch (error) {
    //     console.error('Failed to fetch user role:', error);
    //   }
    // };

    // fetchUserRole();

    // 임시로 학생 역할 설정
    setUserRole('student');
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
