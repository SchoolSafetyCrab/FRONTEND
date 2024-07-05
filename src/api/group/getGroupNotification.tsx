import axios from 'axios';
import API_BASE_URL from '../Apiconfig';
import { MessageInfo } from '../../interfaces/MessageInfo';

const getGroupNotification = async (groupId: number): Promise<MessageInfo[] | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  try {
    const response = await axios.get(`${API_BASE_URL}api/common/find/notification/${groupId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const result = response.data.data;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default getGroupNotification;
