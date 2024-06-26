import React from 'react';
import '@styles/group/Message.css';
import TeacherProfile from '@assets/images/profile/profile1.svg';

interface MessageProps {
  title: string;
  detail: string;
  startDate: Date;
}

const Message: React.FC<MessageProps> = ({ title, detail, startDate }) => {
  return (
    <div className="message-container">
      <div className="teacher-profile-div">
        <img src={TeacherProfile} alt="선생님 프로필 이미지" />
        <h3>김유미 선생님</h3>
        <p>{startDate.toLocaleDateString()}</p>
      </div>
      <div className="content-div">
        <h1>{title}</h1>
        <p>{detail}</p>
      </div>
    </div>
  );
};

export default Message;
