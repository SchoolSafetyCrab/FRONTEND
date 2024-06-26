import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

export interface CreateGroupInfo {
  schoolName: string;
  schoolYear: number;
  schoolBan: number;
  userNum: number;
  groupCode: string;
}

export const createGroupApi = async (createGroupInfo: CreateGroupInfo): Promise<boolean> => {
  let result: boolean = false;
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  await axios
    .post(`${API_BASE_URL}api/teacher/create/group`, createGroupInfo, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then(() => {
      alert('그룹이 성공적으로 만들어졌습니다.');
      result = true;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
      result = false;
    });

  return result;
};
