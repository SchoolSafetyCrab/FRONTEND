import { atomWithImmer } from 'jotai-immer';
import { atom } from 'jotai';
import { location } from '../../api/way/GetSchoolWay';

interface latlnng {
  latitude: string;
  longitude: string;
}

const WayAtom = atomWithImmer<location[] | []>([]); // 등교길 지점 리스트

const WayAddAtom = atomWithImmer<boolean>(false); // 등교길 추가하는 화면인지 아닌지 구분하는 상태

const WayAddEndAtom = atomWithImmer<boolean>(false); // 등교길 추가 완료인지 구분하는 상태
const nowLocationAtom = atomWithImmer<latlnng>({ latitude: '', longitude: '' }); // 현재 클릭한 위치 저장 아톰
const polylineAtom = atom<any>(null);
const buttonAtom = atomWithImmer<number>(0);
export { WayAtom, WayAddAtom, WayAddEndAtom, nowLocationAtom, polylineAtom, buttonAtom };
