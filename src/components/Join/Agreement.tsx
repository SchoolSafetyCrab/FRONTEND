import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export default function Agreement() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/join/verification');
  };

  return (
    <>
      <div className="agreement">
        <h1>어서 오세요!</h1>
        <h1>회원 가입을 도와드릴게요.</h1>
        <img className="img" src={logo} alt="logo img" />
      </div>
      <div>
        <button onClick={handleNext} type="button">
          Next
        </button>
      </div>
    </>
  );
}
