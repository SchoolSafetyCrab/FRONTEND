import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import '@styles/JoinIdentity.css';

export default function JoinIdentity() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>마지막 단계예요!</h1>
      <h1>직업을 선택해 주세요.</h1>
      <div className="card-container">
        <div className="card">
          <img src={logo} className="card-img-top " alt="..." />
          <p>학생</p>
        </div>
        <div className="card">
          <img src={logo} className="card-img-top " alt="..." />
          <p>선생님</p>
        </div>
        <div className="card">
          <img src={logo} className="card-img-top " alt="..." />
          <p>부모님</p>
        </div>
      </div>

      <div className="buttonContainer d-grid gap-2">
        <button onClick={handleNext} type="button" className="btn btn-primary mt-3">
          Next
        </button>
      </div>
    </div>
  );
}
