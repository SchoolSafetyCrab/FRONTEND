import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

// 인터페이스 정의
export interface location {
  latitude: string;
  longitude: string;
}

export const getSchoolWay = async (): Promise<location[]> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(`${API_BASE_URL}api/student/find/schoolway`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    console.log('콘솔 결과 찍기: ', response);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return [];
  }
};
