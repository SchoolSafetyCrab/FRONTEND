import { Route, Routes } from 'react-router-dom';
import StudentGroupPage from '@pages/group/StudentGroupPage';
import TeacherGroupPage from '@pages/group/TeacherGroupPage';

export default function GroupPage() {
  return (
    <div className="group-container">
      <Routes>
        <Route path="/student" element={<StudentGroupPage />} />
        <Route path="/teacher" element={<TeacherGroupPage />} />
      </Routes>
    </div>
  );
}
