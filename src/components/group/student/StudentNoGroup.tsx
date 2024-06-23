import Jellyfish from '@assets/images/group/jellyfish.svg';

export default function StudentNoGroup() {
  return (
    <div
      className="no-group-section"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={Jellyfish} alt="해파리" style={{ width: '50%' }} />
      <h1 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>아직 가입한 그룹이 없어요.</h1>
    </div>
  );
}
