import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '@styles/join/JoinIdDentity.css';

export default function JoinIdentity() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };

  const isFinshDisabled = false;
  return (
    <>
      <section className="join-dentity-header">
        <h1>
          마지막 단계예요!
          <br />
          직업을 선택해 주세요.
        </h1>
      </section>

      <section className="join-dentity-select">
        <div className="card-container">
          <button type="button" className="card">
            <p>학생</p>
          </button>
          <button type="button" className="card">
            <p>선생님</p>
          </button>
          <button type="button" className="card">
            <p>부모님</p>
          </button>
        </div>
      </section>

      <section className="join-dentity-btn">
        <div className="buttonContainer">
          <Button
            className="agreement-btn custom-button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={isFinshDisabled}
            style={{
              backgroundColor: isFinshDisabled ? '#DDDBD6' : '#FFB800',
              color: 'white',
              border: 'none',
            }}
          >
            완료
          </Button>
        </div>
      </section>
    </>
  );
}
