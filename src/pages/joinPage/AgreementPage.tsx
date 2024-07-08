import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Checkbox from '@components/common/Checkbox';
import crab from '@assets/images/main/crab.png';

import '@styles/join/Agreement.css';

export default function Agreement() {
  const [agreeAll, setAgreeAll] = React.useState(false);
  const [agree1, setAgree1] = React.useState(false);
  const [agree2, setAgree2] = React.useState(false);
  const [agree3, setAgree3] = React.useState(false);

  const navigate = useNavigate();
  const handleNext = () => {
    if (agree1 === true && agree2 === true) {
      navigate('/join/verification');
    }
  };

  const handleAllChecked = (checked: boolean) => {
    setAgreeAll(checked);
    setAgree1(checked);
    setAgree2(checked);
    setAgree3(checked);
  };

  React.useEffect(() => {
    setAgreeAll(agree1 && agree2 && agree3);
  }, [agree1, agree2, agree3]);

  const isNextDisabled = !(agree1 && agree2);

  return (
    <>
      <section className="agreement-header">
        <h1>어서 오세요!</h1>
        <h1>회원 가입을 도와드릴게요.</h1>
      </section>
      <section className="agreement-img">
        <div className="img-center">
          <img className="imgs" src={crab} alt="logo img" />
        </div>
      </section>
      <section className="agreement-check">
        <div className="checkboxes">
          <div className="checkbox">
            <Checkbox checked={agreeAll} onChange={handleAllChecked}>
              전체 약관 동의
            </Checkbox>
          </div>
          <hr style={{ width: '100%' }} />
          <div className="checkbox">
            <Checkbox checked={agree1} onChange={setAgree1}>
              (필수) 개인정보 수집 및 이용 동의
            </Checkbox>
          </div>
          <div className="checkbox">
            <Checkbox checked={agree2} onChange={setAgree2}>
              (필수) 개인정보 제 3자 제공 동의서
            </Checkbox>
          </div>
          <div className="checkbox">
            <Checkbox disabled={agree1} checked={agree3} onChange={setAgree3}>
              (선택) 광고성 정보 수신 동의
            </Checkbox>
          </div>
        </div>
      </section>
      <section className="agreement-next-btn">
        <div className="agreement-button-container">
          <Button
            className="agreement-btn custom-button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={isNextDisabled}
            style={{
              backgroundColor: isNextDisabled ? '#DDDBD6' : '#FFB800',
              color: 'white',
              border: 'none',
            }}
          >
            다음
          </Button>
        </div>
      </section>
    </>
  );
}
