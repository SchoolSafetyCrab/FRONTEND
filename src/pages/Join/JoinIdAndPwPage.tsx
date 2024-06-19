import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '@styles/join/JoinIdPw.css';

export default function JoinIdAndPw() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/join/profile');
  };

  const isAuthDisabled = false;

  return (
    <>
      <section className="join-id-pw-header">
        <h1>
          아이디와 비밀번호를
          <br />
          설정할게요.
        </h1>
      </section>

      <section className="join-id-pw-input">
        <div className="id form-floating ">
          <input
            type="text"
            className="form-control"
            id="idInput"
            placeholder="8자 이상의 영문"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <label
            htmlFor="idInput"
            className="id-label"
          >
            아이디
          </label>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            id="button-addon2"
            style={{ margin: ' 0' }}
          >
            중복확인
          </button>
        </div>
        <div className="password form-floating">
          <input
            type="text"
            className="form-control"
            id="pwInput"
            placeholder="8자 이상의 영문, 숫자, 특수 문자 조합"
          />
          <label htmlFor="pwInput">비밀번호</label>
        </div>
        <div className="password2 form-floating">
          <input
            type="text"
            className="form-control"
            id="pwInput2"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
          />
          <label htmlFor="pwInput2">비밀번호 확인</label>
        </div>
      </section>

      <section className="join-id-pw-btn">
        <div className="buttonContainer">
          <Button
            className="agreement-btn custom-button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={isAuthDisabled}
            style={{
              backgroundColor: isAuthDisabled ? '#DDDBD6' : '#FFB800',
              color: 'white',
              border: 'none',
            }}
          >
            Next
          </Button>
        </div>
      </section>
    </>
  );
}
