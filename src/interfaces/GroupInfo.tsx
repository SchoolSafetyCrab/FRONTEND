export interface GroupInfo {
  groupId: number;
  schoolName: string;
  schoolYear: number;
  schoolBan: number;
  state: boolean;
}

export interface GroupInfoResponse {
  data: GroupInfo[];
}
