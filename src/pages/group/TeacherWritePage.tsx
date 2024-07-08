/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
import { useNavigate, useParams } from 'react-router-dom';
import back from '@assets/images/mypage/backarrow.svg';
import { useState, ChangeEvent } from 'react';
import '@styles/group/teacher/TeacherWritePage.css';
import { postNotification, NotificationInfo } from '../../api/group/postNotificationApi';

// import { GroupInfoResponse, GroupInfo } from '../../interfaces/GroupInfo';

export default function TeacherNoticePage() {
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState('');
  const [inputNotice, setInputNotice] = useState('');
  // eslint-disable-next-line no-unused-vars

  const params = useParams();
  const groupId: string = params.groupId as string;

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotice = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setInputNotice(value);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputTitle(value);
  };

  const changeDateFormat = () => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + 2);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
  };

  const handleConfirm = async () => {
    // 오늘 날짜에 2일을 더합니다.
    const endDates = changeDateFormat();

    const noti: NotificationInfo = {
      title: inputTitle,
      detail: inputNotice,
      endDate: endDates,
      groupId: Number(groupId),
      // 다른 필요한 필드들을 추가할 수 있음
    };

    try {
      console.log('들어가는 공지사항: ', noti);
      const isSuccess = await postNotification(noti);
      console.log('공지사항 메시지: ', isSuccess);
      if (isSuccess) {
        console.log('공지사항 등록');
      } else {
        console.error('공지사항 등록 실패');
      }
      navigate(-1);
    } catch (error) {
      console.error('Error posting notification:', error);
      navigate(-1);
    }
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
        <input
          value={inputTitle}
          onChange={handleTitle}
          placeholder="제목"
          style={{ width: '100%' }}
        />
        <textarea
          style={{ width: '100%' }}
          className=" txt-area"
          id="parentId"
          placeholder="공지사항 내용을 작성해주세요"
          onChange={handleNotice}
          value={inputNotice}
        />
      </section>
    </div>
  );
}
