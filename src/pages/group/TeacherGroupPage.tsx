import { useAtom } from 'jotai';
// import TeacherWritePage from './TeacherWritePage';
import TeacherGroup from '@components/group/teacher/TeacherGroup';
import { activeButtonAtom } from '@components/group/teacher/TeacherHeader';

// import MakeGroup from '../../components/group/teacher/MakeGroup';
import TeacherMap from '../../components/group/teacher/TeacherMap';
// import AddStudent from '../../components/group/teacher/AddStudent';
// import ClickStudentTab from '../../components/group/teacher/ClickStudentTab';

export default function TeacherGroupPage() {
  const [activeButton] = useAtom(activeButtonAtom);

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

  return <div>{renderComponent()}</div>;
}
