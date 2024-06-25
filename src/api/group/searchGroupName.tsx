import axios from 'axios';
import API_BASE_URL from '../Apiconfig';
import { GroupInfoResponse, GroupInfo } from '../../interfaces/GroupInfo';

const searchGroupName = async (query: string): Promise<GroupInfo[] | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(`${API_BASE_URL}api/student/search/group?keyword=${query}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const groupInfo: GroupInfoResponse = response.data;

    return groupInfo.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default searchGroupName;
