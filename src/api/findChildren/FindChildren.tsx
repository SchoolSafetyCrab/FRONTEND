import axios from 'axios';

import API_BASE_URL from '../Apiconfig';

interface Children {
  userId: string;
  id: string;
  nickName: string;
  userImg: string;
}

const findChildren = async (): Promise<Children[] | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(`${API_BASE_URL}api/parents`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const childrenData: Children[] = [];

    for (let i = 0; i < response.data.data.length; i += 1) {
      const children: Children = {
        userId: response.data.data[i].userId,
        id: response.data.data[i].id,
        nickName: response.data.data[i].nickname,
        userImg: response.data.data[i].iconImg,
      };
      childrenData.push(children);
    }

    return childrenData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default findChildren;
