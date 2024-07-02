import { atomWithImmer } from 'jotai-immer';

const AlarmAtom = atomWithImmer(false); // 비상벨 토글 여부(on = true, off = false)
const CctvAtom = atomWithImmer(false);
const SafezoneAtom = atomWithImmer(false); // 어린이 보호구역
const AccidentSiteAtom = atomWithImmer(false); // 사고우발지
const TrafficLightAtom = atomWithImmer(false); // 신호등
export { AlarmAtom, CctvAtom, SafezoneAtom, AccidentSiteAtom, TrafficLightAtom };
