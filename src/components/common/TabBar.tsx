import React from 'react';
import homeIcon from '@assets/images/tab/tab-home.svg';
import wayIcon from '@assets/images/tab/tab-way.svg';
import groupIcon from '@assets/images/tab/tab-group.svg';
import mypageIcon from '@assets/images/tab/tab-mypage.svg';
import homeIconActive from '@assets/images/tab/tab-home-active.svg';
import wayIconActive from '@assets/images/tab/tab-way-active.svg';
import groupIconActive from '@assets/images/tab/tab-group-active.svg';
import mypageIconActive from '@assets/images/tab/tab-mypage-active.svg';
import '@styles/main/TabBar.css';

interface TabBarProps {
  activeTab: number;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (id: number) => void;
}

const tabs = [
  { id: 1, title: '홈', icon: homeIcon, activeIcon: homeIconActive },
  { id: 2, title: '안전등하굣길', icon: wayIcon, activeIcon: wayIconActive }, // 예시용으로 같은 아이콘 사용
  { id: 3, title: '그룹조회', icon: groupIcon, activeIcon: groupIconActive },
  { id: 4, title: '마이페이지', icon: mypageIcon, activeIcon: mypageIconActive },
];

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="tabs">
      <div className="tabList">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <img src={activeTab === tab.id ? tab.activeIcon : tab.icon} alt={`${tab.title} icon`} />
            <div>{tab.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
