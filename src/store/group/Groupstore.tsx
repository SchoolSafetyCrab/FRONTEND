import { atomWithImmer } from 'jotai-immer';
import { GroupInfo } from '../../interfaces/GroupInfo';

export const groupsAtom = atomWithImmer<GroupInfo[]>([]);
export const recentGroup = atomWithImmer<GroupInfo | null>(null);
