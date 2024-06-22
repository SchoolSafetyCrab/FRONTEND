import School from '@assets/images/group/school.svg';
import Message from './Message';
import '@styles/group/ActiveGroup.css';

export default function ActiveGroup() {
  return (
    <div className="active-group-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>한밭 초등학교</h3>
        </div>
        <h1>3학년 2반</h1>
      </div>
      <div className="message-div">
        <Message />
        <Message />
      </div>
    </div>
  );
}
