import { useAtom } from 'jotai';
// import TeacherWritePage from './TeacherWritePage';
import TeacherGroup from '@components/group/teacher/TeacherGroup';
import { activeButtonAtom, activeMakeGroupAtom } from '@components/group/teacher/TeacherHeader';
import { addStudentAtom } from '@components/group/teacher/TeacherMap';
import AddStudent from '@components/group/teacher/AddStudent';

// import MakeGroup from '../../components/group/teacher/MakeGroup';
import TeacherMap from '../../components/group/teacher/TeacherMap';
import MakeGroup from '../../components/group/teacher/MakeGroup';
// import ClickStudentTab from '../../components/group/teacher/ClickStudentTab';

export default function TeacherGroupPage() {
  const [activeButton] = useAtom(activeButtonAtom);
  const [makeGroupStatus] = useAtom(activeMakeGroupAtom);
  const [addStudentStatus] = useAtom(addStudentAtom);

  const renderComponent = () => {
    switch (activeButton) {
      case '지도':
        return <TeacherMap />;
      case '게시글':
        return <TeacherGroup />;
      default:
        return <TeacherMap />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {renderComponent()}
      {makeGroupStatus && <MakeGroup />}

      {addStudentStatus && <AddStudent />}
    </div>
  );
}
