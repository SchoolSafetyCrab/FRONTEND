import { useAtom } from 'jotai';
import { activeMakeGroupAtom } from '@components/group/teacher/TeacherHeader';
import MakeGroup from '../../components/group/teacher/MakeGroup';
import StudentGroupPage from './StudentGroupPage';

export default function TeacherGroupPage() {
  const [makeGroupStatus] = useAtom(activeMakeGroupAtom);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <StudentGroupPage />
      {makeGroupStatus && <MakeGroup />}
    </div>
  );
}
