import ProfileMenu from '@components/mypage/ProfileMenu';
import Profile from '@components/mypage/Profile';

export default function MyPageMain() {
  return (
    <div>
      <div className="profile-section">
        <Profile />
      </div>
      <section className="menu-section">
        <ProfileMenu />
      </section>
    </div>
  );
}
