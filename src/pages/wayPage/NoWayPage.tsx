import star from '@assets/images/group/stars.png';

export default function NoWayPage() {
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
      <img src={star} alt="불가사리" style={{ width: '50%', marginTop: '5%' }} />
      <h1 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>학생만 등굣길을 설정할 수 있어요.</h1>
    </div>
  );
}
