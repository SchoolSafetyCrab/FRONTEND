import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Checkbox from '@components/common/Checkbox';
import '@styles/login/LoginMain.css';

import MainHeader from '@assets/images/MainHeader.svg';

export default function LoginMain() {
  const [saveId, setSaveId] = React.useState(false);

  return (
    <>
      <section className="login-main-header">
        <img src={MainHeader} alt="logo img" />
      </section>

      <section className="id-password">
        <div className="form-floating">
          <input type="id" className="form-control" id="idInput" placeholder="비밀번호" />
          <label htmlFor="idInput">아이디</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="passwdInput" placeholder="비밀번호" />
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
            style={{ backgroundColor: '#DDDBD6', color: 'white', border: 'none' }}
          >
            로그인
          </Button>
        </div>
      </section>

      <section className="wanna-join">
        <div>
          <Link to="./join" style={{ color: '#DDDBD6' }}>회원가입</Link>
        </div>
      </section>
    </>
  );
}
