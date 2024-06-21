import { atomWithImmer } from 'jotai-immer';

interface LatLong {
  latitude: number;
  longitude: number;
}

const latlongAtom = atomWithImmer<LatLong | {}>({});

export default latlongAtom;
