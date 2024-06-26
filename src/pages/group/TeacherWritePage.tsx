import { useNavigate } from 'react-router-dom';
import back from '@assets/images/mypage/backarrow.svg';
import { useState, ChangeEvent, useEffect } from 'react';
import '@styles/group/teacher/TeacherWritePage.css';
import { postNotification, NotificationInfo } from '../../api/group/postNotificationApi';
import getGroupInfo from '../../api/group/getGroupInfo';
// import { GroupInfoResponse, GroupInfo } from '../../interfaces/GroupInfo';

export default function TeacherNoticePage() {
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState('');
  const [inputNotice, setInputNotice] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [groupInfo, setGroupInfo] = useState(1 || null);

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

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const res = await getGroupInfo();
        if (res) {
          console.log(res);
          setGroupInfo(res[0]?.groupId);
        } else {
          console.error('Response is null or undefined');
        }
      } catch (error) {
        console.error('Error fetching group info:', error);
      }
    };
    fetchGroupInfo();
  }, []);

  const handleConfirm = async () => {
    // 현재 날짜를 가져옵니다.
    const today = new Date();
    // 오늘 날짜에 2일을 더합니다.
    const endDates = new Date(today);
    endDates.setDate(endDates.getDate() + 2);

    const noti: NotificationInfo = {
      title: inputTitle,
      detail: inputNotice,
      endDate: endDates,
      groupId: groupInfo,
      // 다른 필요한 필드들을 추가할 수 있음
    };

    try {
      const isSuccess = await postNotification(noti);
      if (isSuccess) {
        console.log('공지사항 등록');
      } else {
        console.error('Failed to send Parent ID');
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
        <input value={inputTitle} onChange={handleTitle} placeholder="제목" />
        <textarea
          rows={25}
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
