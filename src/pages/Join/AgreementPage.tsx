import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Checkbox from '@components/common/Checkbox';

import logo from '@assets/images/logo.png';
import '@styles/Agreement.css';

export default function Agreement() {
  const [agreeAll, setAgreeAll] = React.useState(false);
  const [agree1, setAgree1] = React.useState(false);
  const [agree2, setAgree2] = React.useState(false);
  const [agree3, setAgree3] = React.useState(false);

  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/join/verification');
  };

  return (
    <>
      <div className="agreement">
        <h1>어서 오세요!</h1>
        <h1>회원 가입을 도와드릴게요.</h1>
        <div className="img-center">
          <img className="imgs" src={logo} alt="logo img" />
        </div>
        <div className="checkboxes">
          <Checkbox checked={agreeAll} onChange={setAgreeAll}>
            전체 약관 동의
          </Checkbox>
          <br />
          <hr />
          <div className="checkbox2">
            <Checkbox checked={agree1} onChange={setAgree1}>
              (필수) 개인정보 수집 및 이용 동의
            </Checkbox>
            <Checkbox checked={agree2} onChange={setAgree2}>
              (필수) 개인정보 제 3자 제공 동의서
            </Checkbox>
            <Checkbox checked={agree3} onChange={setAgree3}>
              (선택) 광고성 정보 수신 동의
            </Checkbox>
          </div>
        </div>
      </div>
      <div>
        <div className="buttonContainer d-grid gap-2">
          <Button variant="primary" size="lg" onClick={handleNext}>
            다음
          </Button>
        </div>
      </div>
    </>
  );
}
