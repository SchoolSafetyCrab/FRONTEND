import { atomWithImmer } from 'jotai-immer';

interface LatLong {
  latitude: number;
  longitude: number;
}

export const latlongDeclarationAtom = atomWithImmer<LatLong | {}>({});

export const isDeclarationAtom = atomWithImmer(true);
