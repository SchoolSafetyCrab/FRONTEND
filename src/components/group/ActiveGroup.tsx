import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { GroupInfo } from 'interfaces/GroupInfo';
import School from '@assets/images/group/school.svg';
import '@styles/group/ActiveGroup.css';
import Message from './Message';
import getGroupNotification from '../../api/group/getGroupNotification';
import { MessageInfo } from '../../interfaces/MessageInfo';
import userInfoAtom from '../../store/userInfo/UserFindInfo';

interface ActiveGroupProps {
  group: GroupInfo;
}

const ActiveGroup: React.FC<ActiveGroupProps> = ({ group }) => {
  const [isnotification, setIsNotification] = useState(false);
  const [notifications, setNotifications] = useState<MessageInfo[]>([]);
  const [userRole] = useAtom(userInfoAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isnotification) {
      const fetchNotiData = async () => {
        const response = await getGroupNotification(group.groupId);
        if (response) {
          setNotifications(response);
        }
      };
      fetchNotiData();
    }
    if (!isnotification) {
      setNotifications([]);
    }
  }, [isnotification]);

  const handleNotification = () => {
    setIsNotification(!isnotification);
    console.log(group.groupId);
  };

  const handleLookClass = () => {
    navigate(`/group/${group.groupId}`);
  };

  return (
    <button type="button" onClick={handleNotification} className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{group.schoolName}</h3>
        </div>
        <h1>{`${group.schoolYear}학년 ${group.schoolBan}반`}</h1>
        <div className="message-div">
          {notifications.map((notification) => (
            <Message
              key={notification.notificationId}
              title={notification.title}
              detail={notification.detail}
              startDate={new Date(notification.startDate)}
            />
          ))}
        </div>
        {userRole.role === 'ROLE_TEACHER' && (
          <div>
            <button type="button" onClick={handleLookClass}>
              반 보러가기
            </button>
          </div>
        )}
      </div>
    </button>
  );
};

export default ActiveGroup;
