import '@styles/mypage/FindGuardianPage.css';
import { useNavigate } from 'react-router-dom';
import turtle from '@assets/images/mypage/turtle.svg';
import back from '@assets/images/mypage/backarrow.svg';
import { useState, ChangeEvent } from 'react';
import changeGuardian from '../../api/mypage/ChangeGuardian';

export default function FindGuardianPage() {
  const navigate = useNavigate();
  const [inputGuardianId, setInputGuardianId] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangeGuardianId = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputGuardianId(value);
  };

  const handleConfirm = async () => {
    const isSuccess = await changeGuardian({ guardianId: inputGuardianId });
    if (isSuccess) {
      console.log('성공');
    } else {
      console.error('Failed to send Parent ID');
    }
    navigate(-1);
  };

  return (
    <div className="find-wrapper">
      <section className="header-wrapper">
        <button type="button" className="button" onClick={handleBack}>
          <img src={back} alt="뒤로가기" />
        </button>
      </section>
      <section className="content-wrapper">
        <img className="imgs" src={turtle} alt="logo img" />
        <input
          type="text"
          className="form-control"
          id="parentId"
          placeholder="보호자 아이디를 입력해주세요"
          onChange={handleChangeGuardianId}
          value={inputGuardianId}
        />
      </section>
      <section className="button-wrapper">
        <button type="button" onClick={handleConfirm}>
          확인
        </button>
      </section>
    </div>
  );
}
