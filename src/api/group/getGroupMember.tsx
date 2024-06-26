import axios from 'axios';
import API_BASE_URL from '../Apiconfig';
import { GroupMemberResponse, GroupMember } from '../../interfaces/GroupMember';

const getGroupMember = async (): Promise<GroupMember[] | null> => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(`${API_BASE_URL}api/teacher/member/group/1`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const groupMember: GroupMemberResponse = response.data;

    return groupMember.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.errorMessage || '알 수 없는 오류가 발생했습니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
    }
    return null;
  }
};

export default getGroupMember;
