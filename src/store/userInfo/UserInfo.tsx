import { atomWithImmer } from 'jotai-immer';

interface UserInfo {
  nickName: string;
  userImg: string;
  role: string;
}

const userInfoAtom = atomWithImmer<UserInfo>({ nickName: '', userImg: '', role: '' });

export default userInfoAtom;
