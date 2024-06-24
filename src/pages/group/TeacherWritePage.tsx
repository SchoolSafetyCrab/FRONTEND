import { useNavigate } from 'react-router-dom';
import back from '@assets/images/mypage/backarrow.svg';
import { useState, ChangeEvent } from 'react';
import '@styles/group/teacher/TeacherWritePage.css';

export default function TeacherNoticePage() {
  const navigate = useNavigate();
  const [inputNotice, setInputNotice] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotice = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setInputNotice(value);
  };

  const handleConfirm = async () => {
    // navigate('/mypage');
    // const isSuccess = await changeGuardian({ guardianId: inputGuardianId });
    // if (isSuccess) {
    //   navigate('/mypage');
    // } else {
    //   console.error('Failed to send Parent ID');
    // }
  };

  return (
    <div className="notice-wrapper">
      <section className="header-wrapper">
        <button type="button" className="button" onClick={handleBack}>
          <img src={back} alt="뒤로가기" />
        </button>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          id="button-addon2"
          onClick={handleConfirm}
          style={{
            margin: '0',
            zIndex: '2',
            backgroundColor: '#FFB800',
            border: 'none',
            color: '#ffffff',
            borderRadius: '20px',
            width: '80px',
          }}
        >
          작성
        </button>
      </section>
      <section className="content-wrapper">
        <textarea
          rows={25}
          className=" txt-area"
          id="parentId"
          placeholder="공지사항을 작성해주세요"
          onChange={handleNotice}
          value={inputNotice}
        />
      </section>
    </div>
  );
}
