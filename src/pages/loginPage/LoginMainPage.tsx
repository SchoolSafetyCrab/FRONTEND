import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Checkbox from '@components/common/Checkbox';
import '@styles/login/LoginMain.css';

// import MainHeader from '@assets/images/MainHeader.svg';
import LoginHeader from '@assets/images/main/LoginHeader2.png';
import login from '../../api/login/LoginApi';

export default function LoginMain() {
  const [saveId, setSaveId] = useState(false);
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const navigate = useNavigate();

  const handleChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputId(value);
  };

  const handleChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputPw(value);
  };

  const handleLogin = async () => {
    const success = await login({ id: inputId, password: inputPw });
    if (success) {
      navigate('/main');
    }
  };

  return (
    <>
      <section className="login-main-header">
        <img src={LoginHeader} alt="logo img" />
      </section>

      <section className="id-password">
        <div className="form-floating">
          <input
            type="id"
            className="form-control"
            id="idInput"
            placeholder="아이디"
            onChange={handleChangeId}
          />
          <label htmlFor="idInput">아이디</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="passwdInput"
            placeholder="비밀번호"
            onChange={handleChangePw}
          />
          <label htmlFor="passwdInput">비밀번호</label>
        </div>

        <div className="login-details">
          <Checkbox checked={saveId} onChange={setSaveId}>
            아이디 저장
          </Checkbox>
          <div className="find-id-pw">
            <button className="find-id btn" type="button">
              아이디 찾기
            </button>
            ·
            <button className="findPw btn" type="button">
              비밀번호 찾기
            </button>
          </div>
        </div>

        <div className="button-container">
          <Button
            className="login-btn custom-button"
            variant="primary"
            size="lg"
            style={{ backgroundColor: '#FFB800', color: 'white', border: 'none' }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>
      </section>

      <section className="wanna-join">
        <div>
          <Link to="./join" style={{ color: '#DDDBD6' }}>
            회원가입
          </Link>
        </div>
      </section>
    </>
  );
}
