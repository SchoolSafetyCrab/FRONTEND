import React, { ChangeEvent, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '@styles/join/Verification.css';

import sendAuthCode from '../../api/join/SendAuthCodeApi';
import checkCode from '../../api/join/CheckAuthCodeApi';
import { phoneNumberAtom } from '../../store/join/Joinsstore';

export default function Verification() {
  const navigate = useNavigate();
  const [isNumberDisabled, setIsNumberDisabled] = useState(true);
  const [isAuthDisabled, setIsAuthDisabled] = useState(true);
  const [password, setPassword] = useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputAuthCode, setInputAuthCode] = useState('');

  const [, setPhoneNumber] = useAtom(phoneNumberAtom);

  const handlePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (value.length === 11) {
      setInputPhoneNumber(value);
      setIsNumberDisabled(false);
    } else {
      setInputPhoneNumber('');
      setIsNumberDisabled(true);
    }
  };
  const handleAuthNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setInputAuthCode(value);
    setIsAuthDisabled(value.length === 0);
  };
  const handlePW = async () => {
    const formatted = `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3, 7)}-${inputPhoneNumber.slice(7)}`;
    const success = await sendAuthCode({ phoneNumber: formatted });

    setPassword(success);
  };
  const handleNext = async () => {
    const formatted = `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3, 7)}-${inputPhoneNumber.slice(7)}`;

    const isValid = await checkCode({ phoneNumber: formatted, authCode: inputAuthCode });
    if (isValid) {
      setPhoneNumber(formatted);
      navigate('/join/id-and-pw');
    }
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
            <input
              type="text"
              className="form-control"
              id="pwInput"
              placeholder="인증번호"
              onChange={handleAuthNumber}
            />
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
              disabled={isNumberDisabled}
              style={{
                backgroundColor: isNumberDisabled ? '#DDDBD6' : '#FFB800',
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
                backgroundColor: isAuthDisabled ? '#DDDBD6' : '#FFB800',
                color: 'white',
                border: 'none',
              }}
            >
              다음
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
