export interface GroupMember {
  userId: number;
  nickname: string;
  iconImg: string;
}

export interface GroupMemberResponse {
  data: GroupMember[];
}
