import React from 'react';
import { useAtom } from 'jotai';
import ActiveGroup from '@components/group/student/ActiveGroup';
import DisActiveGroup from '@components/group/student/DisActiveGroup';
import '@styles/group/StudentGroup.css';
import findGroupAtom from '../../../store/group/findGroupStore';

export default function StudentGroup() {
  const [groupsInfo] = useAtom(findGroupAtom);

  console.log(groupsInfo.length);
  return (
    <div className="group-section">
      <section className="group-active">
        {groupsInfo.map((group) => {
          if (group.state) {
            return <ActiveGroup key={group.groupId} group={group} />;
          }
          return <DisActiveGroup key={group.groupId} />;
        })}
      </section>
    </div>
  );
}
