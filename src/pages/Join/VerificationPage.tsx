import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '@styles/join/Verification.css';

export default function Verification() {
  const navigate = useNavigate();
  const [isAuthDisabled, setIsAuthDisabled] = React.useState(true);
  const [password, setPassword] = React.useState(false);

  const handlePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (value.length === 11) {
      setIsAuthDisabled(false);
    } else {
      setIsAuthDisabled(true);
    }
  };
  const handlePW = () => {
    setPassword(true);
  };
  const handleNext = () => {
    navigate('/join/id-and-pw');
  };

  return (
    <>
      <section className="verification-header">
        <h1>본인 인증을 진행할게요.</h1>
      </section>
      <section className="verification-input">
        <div className="form-floating">
          <input type="text" className="form-control" id="nameInput" placeholder="이름" />
          <label htmlFor="floatingInputGrid">이름</label>
        </div>

        <div className="form-floating">
          <input
            type="tel"
            className="form-control"
            id="floatingInputGrid"
            placeholder="전화번호"
            onChange={handlePhoneNumber}
          />
          <label htmlFor="floatingInputGrid">전화번호</label>
        </div>
        {password && (
          <div className="form-floating">
            <input type="text" className="form-control" id="pwInput" placeholder="인증번호" />
            <label htmlFor="pwInput">인증번호</label>
          </div>
        )}
      </section>
      <section className="verification-btn">
        {!password && (
          <div className="buttonContainer">
            <Button
              className="agreement-btn custom-button"
              variant="primary"
              size="lg"
              onClick={handlePW}
              disabled={isAuthDisabled}
              style={{
                backgroundColor: isAuthDisabled ? '#DDDBD6' : '#007bff',
                color: 'white',
                border: 'none',
              }}
            >
              인증번호 요청
            </Button>
          </div>
        )}
        {password && (
          <div className="buttonContainer">
            <Button
              className="agreement-btn custom-button"
              variant="primary"
              size="lg"
              onClick={handleNext}
              disabled={isAuthDisabled}
              style={{
                backgroundColor: isAuthDisabled ? '#DDDBD6' : '#007bff',
                color: 'white',
                border: 'none',
              }}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
