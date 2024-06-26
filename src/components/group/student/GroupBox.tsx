/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import School from '@assets/images/group/school.svg';
import People from '@assets/images/group/people.svg';
import '@styles/group/GroupBox.css';
import joinGroup from '../../../api/group/joinGroup';

interface GroupBoxProps {
  groupId: number;
  schoolName: string;
  schoolYear: number;
  schoolBan: number;
  state: boolean;
}

const GroupBox: React.FC<GroupBoxProps> = ({
  groupId,
  schoolName,
  schoolYear,
  schoolBan,
  state,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputPassword('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await joinGroup({ groupId, groupCode: inputPassword });
      console.log('here response:', response);
      if (response === '') {
        alert('가입이 실패했습니다.');
        handleModalClose();
      } else {
        alert('가입이 완료되었습니다.');
        handleModalClose();
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert('가입 과정에서 오류가 발생했습니다.');
    }
  };

  return (
    <div className="box-container">
      <div className="group-name-div">
        <div className="school-div">
          <img src={School} alt="학교 아이콘" />
          <h3>{schoolName}</h3>
        </div>
        <h1>
          {schoolYear}학년 {schoolBan}반
        </h1>
      </div>
      <div className="people-div">
        <img src={People} alt="사람 아이콘" />
        <h3>{state ? '가입 가능' : '가입 불가'}</h3>
      </div>
      <div className="button-div">
        <button type="button" onClick={handleModalOpen}>
          가입하기
        </button>
      </div>

      {isModalOpen && (
        <div className="password-modal-container">
          <div className="pwd-modal-background-div" />
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
};

export default GroupBox;
