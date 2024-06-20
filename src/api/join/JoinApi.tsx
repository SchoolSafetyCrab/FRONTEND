import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface Join {
  id: string;
  password: string;
  nickname: string;
  iconImg: string;
  role: string;
  phoneNumber: string;
}

const join = async (signUp: Join): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/join`, signUp)
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

export default join;
