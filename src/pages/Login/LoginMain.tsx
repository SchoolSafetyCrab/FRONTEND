import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Checkbox from '@components/common/Checkbox';
import logo from '@assets/images/logo.png';
import '@styles/LoginMain.css';

export default function LoginMain() {
  const [saveId, setSaveId] = React.useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="loginMain fullsize">
        <section className="logoAndImg">
          <div>로고자리입니다</div>
          <img className="imgs" src={logo} alt="logo img" />
        </section>
        <section className="idAndPassword">
          <div className="id form-floating">
            <input type="id" className="form-control" id="idInput" placeholder="비밀번호" />
            <label htmlFor="idInput">아이디</label>
          </div>
          <div className="password form-floating">
            <input
              type="password"
              className="form-control"
              id="passwdInput"
              placeholder="비밀번호"
            />
            <label htmlFor="passwdInput">비밀번호</label>
          </div>
          <div className="buttons">
            <Checkbox checked={saveId} onChange={setSaveId}>
              아이디 저장
            </Checkbox>
            <div className="findIdPw">
              <button className="findId btn" type="button">
                아이디 찾기
              </button>
              |
              <button className="findPw btn" type="button">
                비밀번호 찾기
              </button>
            </div>
          </div>
          <div className="buttonContainer d-grid gap-2">
            <Button variant="primary" size="lg">
              로그인
            </Button>
          </div>
        </section>
        <section className="wannaJoin  gap-2">
          <Link to="./join">회원가입</Link>
        </section>
      </div>
    </>
  );
}
