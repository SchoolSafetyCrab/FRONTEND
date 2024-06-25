import React from 'react';
import '@styles/groupChildrenPage/GroupChildrenPage.css';
import MapBox from '@components/common/MapBox';
import GroupChildrenFind from './GroupChildrenFind';

export default function GroupChildrenPage() {
  return (
    <section className="groupChildrenContainer">
      <section className="groupChildrenHeader">
        <GroupChildrenFind />
      </section>
      <MapBox />
    </section>
  );
}
