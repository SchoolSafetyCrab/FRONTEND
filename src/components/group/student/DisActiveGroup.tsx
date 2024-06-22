import School from '@assets/images/group/gray-school.svg';

export default function DisActiveGroup() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid #DDDBD6',
        borderRadius: '20px',
        padding: '1rem',
        color: '#DDDBD6',
      }}
    >
      <div className="name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>한밭 초등학교</h3>
        </div>
        <h1>3학년 2반</h1>
      </div>
    </div>
  );
}
