import School from '@assets/images/group/school.svg';
import People from '@assets/images/group/people.svg';
import '@styles/group/GroupBox.css';

export default function GroupBox() {
  return (
    <div className="box-container">
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>한밭 초등학교</h3>
        </div>
        <h1>3학년 2반</h1>
      </div>
      <div className="people-div">
        <img src={People} alt="사람 아이콘" />
        <h3>26/32</h3>
      </div>
      <div className="button-div">
        <button type="button">가입하기</button>
      </div>
    </div>
  );
}
