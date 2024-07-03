import { GroupInfo } from 'interfaces/GroupInfo';
import { atomWithImmer } from 'jotai-immer';

const findGroupAtom = atomWithImmer<GroupInfo[]>([]);
export default findGroupAtom;
