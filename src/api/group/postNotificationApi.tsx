import axios from 'axios';

export interface NotificationInfo {
  groupId: number;
  title: string;
  detail: string;
  endDate: Date;
}

export const postNotification = async (notificationInfo: NotificationInfo): Promise<boolean> => {
  let result: boolean = false;
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  await axios
    .post(`http://localhost:8081/api/teacher/create/notification`, notificationInfo, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then(() => {
      alert('공지사항이 등록되었습니다.');
      result = true;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        console.log(err);
        alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
      result = false;
    });

  return result;
};
