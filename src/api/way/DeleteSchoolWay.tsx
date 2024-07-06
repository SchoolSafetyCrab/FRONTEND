import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

const deleteSchoolWay = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.delete(`${API_BASE_URL}api/student/delete/schoolway`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    console.log('api 내에서의 삭제 메시지: ', response);
    if (response.data.data === 'SUCCESS_DELETE_SCHOOL_WAY') {
      return true;
    }
    return false;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('delete school way api에서 오류가 발생했습니다.');
    }
    return false;
  }
};

export default deleteSchoolWay;
