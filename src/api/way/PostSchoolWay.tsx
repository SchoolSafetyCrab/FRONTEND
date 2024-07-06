import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

// 인터페이스 정의
interface location {
  latitude: string;
  longitude: string;
}

const transformPoints = (points: location[]) => {
  return {
    points: points.map((point) => ({
      latitude: point.latitude.toString(),
      longitude: point.longitude.toString(),
    })),
  };
};

const postSchoolWay = async (points: location[]): Promise<boolean> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (!accessToken) {
    alert('Access token is missing. Please log in again.');
    return false;
  }
  console.log('들어온 points:', points);
  const transformedData = transformPoints(points);
  try {
    console.log('변형된 points: ', transformedData);

    const response = await axios.post(
      `${API_BASE_URL}api/student/save/schoolway`,
      transformedData,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    console.log('api 내에서의 추가 메시지: ', response);
    if (response.data.data === 'SUCCESS_SAVE_SCHOOL_WAY') {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return false;
  }
};

export default postSchoolWay;
