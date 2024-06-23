import React, { useState } from 'react';
import School from '@assets/images/group/school.svg';
import People from '@assets/images/group/people.svg';
import '@styles/group/GroupBox.css';

export default function GroupBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean | null>(null);

  const correctPassword = '1234'; // 실제 비밀번호로 교체

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputPassword('');
    setIsPasswordCorrect(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === correctPassword) {
      alert('가입이 완료되었습니다.');
      handleModalClose();
    } else {
      alert('비밀번호가 틀렸습니다.');
      setIsPasswordCorrect(false);
      handleModalClose();
    }
  };

  return (
    <div className="box-container">
      <div className="group-name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>한밭 초등학교</h3>
        </div>
        <h1>3학년 2반</h1>
      </div>
      <div className="people-div">
        <img src={People} alt="사람 아이콘" />
        <h3>26/32</h3>
      </div>
      <div className="button-div">
        <button type="button" onClick={handleModalOpen}>
          가입하기
        </button>
      </div>

      {isModalOpen && (
        <div className="password-modal-container">
          <div className="background-div" />
          <div className="modal-contents">
            <h1 style={{ fontSize: '1rem' }}>비밀번호를 입력해주세요.</h1>
            <input
              type="password"
              className="form-control"
              id="group-password"
              value={inputPassword}
              onChange={handlePasswordChange}
              style={{
                fontSize: '1.5rem',
                width: '100%',
                height: '2rem',
                border: '1px solid #FFD568',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            />
            <button type="button" onClick={handlePasswordSubmit}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
