import { atomWithImmer } from 'jotai-immer';

interface Location {
  latitude: number;
  longitude: number;
}
const pointAtom = atomWithImmer<Location>({
  latitude: 0,
  longitude: 0,
});

export default pointAtom;
