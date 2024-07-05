import axios from 'axios';

import API_BASE_URL from '../Apiconfig';

interface ChildrenSchoolWay {
  latitude: string;
  longitude: string;
}

const TeacherFindChildrenSchoolWay = async (
  userId: number,
  groupId: string,
): Promise<ChildrenSchoolWay[] | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(`${API_BASE_URL}api/teacher/member/schoolway/group?groupId=${groupId}&userId=${userId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const childrenSchoolWayData: ChildrenSchoolWay[] = [];

    for (let i = 0; i < response.data.data.length; i += 1) {
      const childSchoolWay: ChildrenSchoolWay = {
        latitude: response.data.data[i].latitude,
        longitude: response.data.data[i].longitude,
      };
      console.log(response);
      childrenSchoolWayData.push(childSchoolWay);
    }

    return childrenSchoolWayData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default TeacherFindChildrenSchoolWay;
