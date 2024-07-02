import { atomWithImmer } from 'jotai-immer';

const AlarmAtom = atomWithImmer(false); // 비상벨 토글 여부(on = true, off = false)

const CctvAtom = atomWithImmer(false);

export { AlarmAtom, CctvAtom };
