import React from 'react';
import '@styles/group/Message.css';

interface MessageProps {
  title: string;
  detail: string;
  startDate: Date;
}

const Message: React.FC<MessageProps> = ({ title, detail, startDate }) => {
  return (
    <div className="message-container">
      <div className="teacher-profile-div">
        <h3>{title}</h3>
        <p>{startDate.toLocaleDateString()}</p>
      </div>
      <div className="content-div">
        <p>{detail}</p>
      </div>
    </div>
  );
};

export default Message;
