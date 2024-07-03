import { atomWithStorage } from 'jotai/utils';

interface UserInfo {
  id: string;
  nickName: string;
  userImg: string;
  role: string;
}

// 'user-info'라는 키로 로컬 스토리지에 저장되는 UserInfo 타입의 atom 생성
const userInfoAtom = atomWithStorage<UserInfo>('user-info', {
  id: '',
  nickName: '',
  userImg: '',
  role: '',
});

export default userInfoAtom;
