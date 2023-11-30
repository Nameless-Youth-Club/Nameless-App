import { atom, selector } from 'recoil'
// import userState from './userState'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const unlockState = atom({
    key: 'keyGranted',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export const authEventData = atom({
    key: 'authEventData',
    default: null,
})

export default unlockState