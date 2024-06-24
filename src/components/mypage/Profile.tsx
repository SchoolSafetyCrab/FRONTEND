import ProfileImg from '@assets/images/profile/profile1.svg';
import { useNavigate } from 'react-router-dom';
import '@styles/mypage/Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate('/mypage/setting');
  };
  return (
    <div className="profile-wrapper">
      <div className="img-wrapper">
        <img src={ProfileImg} alt="프로필이미지" />
      </div>
      <div className="name-wrapper">
        <h2>김민규</h2>
        <p>한밭초등학교 5학년 2반</p>
      </div>
      <div className="btn-wrapper">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          id="button-addon2"
          onClick={handleProfile}
          style={{
            margin: ' 0',
            zIndex: '2',
            backgroundColor: '#FFB800',
            border: 'none',
            color: '#ffffff',
            borderRadius: '20px',
          }}
        >
          프로필 설정
        </button>
      </div>
    </div>
  );
}
