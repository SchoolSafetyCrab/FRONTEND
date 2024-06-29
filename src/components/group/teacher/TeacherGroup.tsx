import React from 'react';
import ActiveGroup from '@components/group/ActiveGroup';
import DisActiveGroup from '@components/group/DisActiveGroup';
import '@styles/group/StudentGroup.css';

export default function TeacherGroup() {
  return (
    <div className="group-section">
      <section className="group-active">
        <ActiveGroup />
      </section>
      <section className="group-disactive">
        <DisActiveGroup />
        <DisActiveGroup />
      </section>
    </div>
  );
}
