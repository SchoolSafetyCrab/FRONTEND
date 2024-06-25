import React from 'react';
import '@styles/groupChildrenPage/GroupChildrenPage.css';
import MapBoxParent from '@components/common/MapBoxParents';
import GroupChildrenFind from './GroupChildrenFind';

export default function GroupChildrenPage() {
  return (
    <section className="groupChildrenContainer">
      <section className="groupChildrenHeader">
        <GroupChildrenFind />
      </section>
      <MapBoxParent />
    </section>
  );
}
