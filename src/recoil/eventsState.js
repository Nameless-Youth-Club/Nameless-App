import { atom, selector } from 'recoil'
import userState from './userState'

//     Event data struct
//     id: '',
//     name: '',
//     date: '',
//     startTime: '',
//     endTime: '',
//     tz: '',
//     location: '',
//     imgUrl: '',
//     description: '',
//     userIDs: []
const eventsState = atom({
    key: 'eventsState',
    default: []
})


export default eventsState

