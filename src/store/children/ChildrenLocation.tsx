import { atomWithImmer } from 'jotai-immer';

interface LatLong {
  latitude: string;
  longitude: string;
  img: string;
}

const childrenLocationAtom = atomWithImmer<LatLong>({ latitude: '0', longitude: '0', img: '0' });
export default childrenLocationAtom;
