import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface InputGuardianId {
  guardianId: string;
}

const changeGuardian = async (inputGuardianId: InputGuardianId): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/student/designate/guardian`, inputGuardianId)
    .then(() => {
      alert('보호자 아이디가 성공적으로 전송되었습니다.');
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

export default changeGuardian;
