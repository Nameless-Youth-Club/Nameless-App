import { atom, selector } from 'recoil'

const loadingState = atom({
    key: 'loading',
    default: false
})

export const showSignupState = atom({
    key:'signup',
    default:false
})


export const isPfpMinting = atom({
    key: 'pfpMinting',
    default: false
})

export default loadingState
