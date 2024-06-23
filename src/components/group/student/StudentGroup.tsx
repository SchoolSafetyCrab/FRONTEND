import React from 'react';
import ActiveGroup from '@components/group/student/ActiveGroup';
import DisActiveGroup from '@components/group/student/DisActiveGroup';
import '@styles/group/StudentGroup.css';

export default function StudentGroup() {
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
