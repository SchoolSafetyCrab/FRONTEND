import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/Verification.css';

export default function Verification() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState(false);
  const handlePW = () => {
    setPassword(true);
  };
  const handleNext = () => {
    navigate('/join/id-and-pw');
  };

  return (
    <div>
      <h1>본인 인증을 진행할게요.</h1>
      <div className="name form-floating mb-3">
        <input type="text" className="form-control" id="nameInput" placeholder="이름" />
        <label htmlFor="nameInput">이름</label>
      </div>
      <div className="row g-2">
        <div className="col">
          <div className="form-floating">
            <select className="form-select" id="floatingSelectGrid" aria-label="통신사 선택">
              <option selected>통신사 선택</option>
              <option value="skt">SKT</option>
              <option value="kt">KT</option>
              <option value="lg">LG U+</option>
            </select>
            <label htmlFor="floatingSelectGrid">통신사</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="floatingInputGrid"
              placeholder="전화번호"
            />
            <label htmlFor="floatingInputGrid">전화번호</label>
          </div>
        </div>
      </div>
      {password && (
        <div className="pw form-floating mt-3">
          <input type="text" className="form-control" id="pwInput" placeholder="인증번호" />
          <label htmlFor="pwInput">인증번호</label>
        </div>
      )}
      {!password && (
        <div className="buttonContainer d-grid gap-2">
          <button onClick={handlePW} type="button" className="btn btn-primary mt-3">
            Next
          </button>
        </div>
      )}
      {password && (
        <div className="buttonContainer d-grid gap-2">
          <button onClick={handleNext} type="button" className="btn btn-primary mt-3">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
