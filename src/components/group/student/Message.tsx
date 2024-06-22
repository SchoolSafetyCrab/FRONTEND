import '@styles/group/Message.css';
import TeacherProfile from '@assets/images/profile/profile1.svg';

export default function Message() {
  return (
    <div className="message-container">
      <div className="teacher-profile-div">
        <img src={TeacherProfile} alt="선생님 프로필 이미지" />
        <h3>김유미 선생님</h3>
        <p>2024.06.09</p>
      </div>
      <div className="content-div">
        <p>
          안녕 친구들! 유미 선생님이에요 오늘 학교 앞 육교에서 보수 공사를 진행한다고 하니 모두들
          조심해서 하교하길 바랄게요~
        </p>
      </div>
    </div>
  );
}
