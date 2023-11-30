import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

/*
{
   userInfo: {
      name:
      lastName:
      email:
      username:
      walletAddress
   },
   token:
}
*/

const userState = atom({
   key: 'userState',
   default: {},
   effects_UNSTABLE: [persistAtom]
});

// On change of user state, retreive all nfts
export const userNfts = selector({
   key: 'userNfts',
   get: ({get}) => {
     const user = get(userState);
     return 
   },
 });




const userWalletSelector = selector({
   key: 'userWalletSelectorW',
   get: walletInfo => async () => {

   }
})


export const userFirstSignOnState = atom({
   key: 'firstSignOn',
   default: true,
   effects_UNSTABLE: [persistAtom]
})

export const userIdState = selector({
   key: 'userID',
   get: ({ get }) => get(userState).id,
});

export default userState;
