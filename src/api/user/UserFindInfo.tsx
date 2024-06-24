import axios from 'axios';

import API_BASE_URL from '../Apiconfig';

interface UserInfo {
  id: string;
  nickName: string;
  userImg: string;
  role: string;
}

const findUserInfo = async (): Promise<UserInfo | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  console.log(accessToken);
  try {
    const response = await axios.get(`${API_BASE_URL}api/user`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const userData: UserInfo = {
      id: response.data.data.id,
      nickName: response.data.data.nickName,
      userImg: response.data.data.userImg,
      role: response.data.data.role,
    };

    return userData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default findUserInfo;
