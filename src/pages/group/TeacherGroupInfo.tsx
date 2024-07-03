import Header from '@components/common/Header';
import TeacherMap from '@components/group/teacher/TeacherMap';
import GroupChildrenFind from '@pages/groupPage/GroupChildrenPage/GroupChildrenFind';
import styles from '@styles/main/MainPage.module.css';

export default function TeacherGroupInfo() {
  return (
    <div className={styles.mainContainer}>
      <Header title="지도" />
      <section className="groupChildrenHeader">
        <GroupChildrenFind />
      </section>
      <div style={{ width: '100%', height: '87%' }}>
        <TeacherMap />
      </div>
    </div>
  );
}
