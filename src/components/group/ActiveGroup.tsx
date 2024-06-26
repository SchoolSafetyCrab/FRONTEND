import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import School from '@assets/images/group/school.svg';
import { recentGroup } from '../../store/group/Groupstore';
import Message from './Message';
import '@styles/group/ActiveGroup.css';
import getGroupNotification from '../../api/group/getGroupNotification';
import { MessageInfo } from '../../interfaces/MessageInfo';

const ActiveGroup: React.FC = () => {
  const [notifications, setNotifications] = useState<MessageInfo[]>([]);
  const [recentGroupInfo] = useAtom(recentGroup);

  useEffect(() => {
    const fetchNotiData = async () => {
      if (recentGroupInfo) {
        try {
          const response = await getGroupNotification(recentGroupInfo.groupId);

          if (Array.isArray(response)) {
            setNotifications(response);
          } else {
            console.error('Expected an array of notifications, but got:', response);
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        }
      }
    };
    fetchNotiData();
  }, [recentGroupInfo]);

  if (!recentGroupInfo) {
    return null;
  }

  const validNotifications = notifications.filter(
    (notification) => new Date(notification.endDate) >= new Date(),
  );

  return (
    <div className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{recentGroupInfo.schoolName}</h3>
        </div>
        <h1>{`${recentGroupInfo.schoolYear}학년 ${recentGroupInfo.schoolBan}반`}</h1>
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
