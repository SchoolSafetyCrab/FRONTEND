import { atomWithImmer } from 'jotai-immer';
import { GroupInfo } from '../../interfaces/GroupInfo';
import { GroupMember } from '../../interfaces/GroupMember';

export const groupsAtom = atomWithImmer<GroupInfo[]>([]);
export const recentGroup = atomWithImmer<GroupInfo | null>(null);
export const groupMembers = atomWithImmer<GroupMember[]>([]);
export const selectedMembers = atomWithImmer<GroupMember[]>([]);
