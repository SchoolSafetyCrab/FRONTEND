import { atomWithImmer } from 'jotai-immer';

interface UserInfo {
  id: string;
  nickName: string;
  userImg: string;
  role: string;
}

const userInfoAtom = atomWithImmer<UserInfo>({ id: '', nickName: '', userImg: '', role: '' });

export default userInfoAtom;
