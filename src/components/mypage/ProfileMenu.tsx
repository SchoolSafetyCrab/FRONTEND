import { useNavigate } from 'react-router-dom';
import Menu from './MenuItem';

export default function ProfileMenu() {
  const navigate = useNavigate();
  const goParent = () => {
    navigate('/mypage/parent');
  };
  return (
    <div
      style={{
        paddingLeft: '1rem',
        paddingTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <Menu title="보호자 연결하기" onClick={goParent} />
      <Menu title="비밀번호 재설정" />
      <Menu title="FAQ" />
      <Menu title="고객센터" />
      <Menu title="로그아웃" />
      <Menu title="회원 탈퇴" />
    </div>
  );
}
