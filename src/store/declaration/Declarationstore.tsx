import { atomWithImmer } from 'jotai-immer';

interface LatLong {
  latitude: string;
  longitude: string;
}

export const latlongDeclarationAtom = atomWithImmer<LatLong>({ latitude: '', longitude: '' });

export const isDeclarationAtom = atomWithImmer(true);
export const isBoardVisibleAtom = atomWithImmer(false);
export const isActiveDeclarationBtnAtom = atomWithImmer(true);
