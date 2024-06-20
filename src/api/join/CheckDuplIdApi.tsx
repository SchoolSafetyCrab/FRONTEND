import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface CheckDuplId {
  id: string;
}

const checkId = async (checkDuplId: CheckDuplId): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/join/check/id`, checkDuplId)
    .then(() => {
      alert('사용가능한 아이디 입니다.');
      result = true;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.errorMessage || 'An unknown error occurred');
      } else {
        alert('An unknown error occurred');
      }
      result = false;
    });

  return result;
};

export default checkId;
