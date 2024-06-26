import { atomWithImmer } from 'jotai-immer';

interface SchoolWay {
  latitude: string;
  longitude: string;
}

const childrenSchoolWayAtom = atomWithImmer<SchoolWay[]>([]);
export default childrenSchoolWayAtom;
