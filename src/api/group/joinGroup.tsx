import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface JoinGroupData {
  groupId: number;
  groupCode: string;
}

const joinGroup = async ({ groupId, groupCode }: JoinGroupData): Promise<string | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  try {
    const response = await axios.post(
      `${API_BASE_URL}api/student/regist/group`,
      {
        groupId,
        groupCode,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    const result: string = response.data; // response.data를 직접 결과값으로 설정
    return result;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return '';
  }
};

export default joinGroup;
