import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { groupsAtom } from '@pages/group/StudentGroupPage';
import School from '@assets/images/group/school.svg';
import Message from './Message';
import '@styles/group/ActiveGroup.css';
import getGroupNotification from '../../../api/group/getGroupNotification';
import { MessageInfo } from '../../../interfaces/MessageInfo';

const ActiveGroup: React.FC = () => {
  const [groupsInfo] = useAtom(groupsAtom);
  const [notifications, setNotifications] = useState<MessageInfo[]>([]);

  useEffect(() => {
    const fetchNotiData = async () => {
      try {
        const response = await getGroupNotification(groupsInfo[0]?.groupId);

        if (Array.isArray(response)) {
          setNotifications(response);
        } else {
          console.error('Expected an array of notifications, but got:', response);
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    if (groupsInfo.length > 0) {
      fetchNotiData();
    }
  }, [groupsInfo]);

  if (groupsInfo.length === 0) {
    return null;
  }

  const firstGroup = groupsInfo[0];

  const validNotifications = notifications.filter(
    (notification) => new Date(notification.endDate) > new Date(),
  );

  return (
    <div className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{firstGroup.schoolName}</h3>
        </div>
        <h1>{`${firstGroup.schoolYear}학년 ${firstGroup.schoolBan}반`}</h1>
      </div>
      <div className="message-div">
        {validNotifications.map((notification) => (
          <Message
            key={notification.notificationId}
            title={notification.title}
            detail={notification.detail}
            startDate={new Date(notification.startDate)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveGroup;
