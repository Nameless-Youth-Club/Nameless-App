import { Mumbai } from '@thirdweb-dev/chains';
import { LocalWallet } from '@thirdweb-dev/wallets';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

const { persistAtom } = recoilPersist();

const walletState = atom({
   key: 'walletState',
   default: new LocalWallet({ chain: Mumbai }),
   effects_UNSTABLE: [persistAtom],
});

export const pfpAddress = atom({
   key: 'pfpAddress',
   default: '0xd1B7732a973b2AE18519dF56B51394a46Ae35973',
});

export const nftAddresses = atom({
   key: 'nftAddresses',
   default: [],
});

export const ownedRewards = atom({
   key: 'ownedRewards', // Provide a unique key for the ownedRewards atom
   default: [], // Provide the default value for the atom
});

export const userPfp = atom({
   key: 'userPfps', // Provide a unique key for the ownedRewards atom
   default: {}, // Provide the default value for the atom
});

export const walletSelector = selector({
   key: 'walletSelector',
   get: ({ get }) => {},
});

export const walletConfig = atom({
   key: 'walletConfig',
   default: {},
   effects_UNSTABLE: [persistAtom],
});

export const thirdwebSDK = atom({
   key: 'thirdwebSDK',
   default: null,
   effects_UNSTABLE: [persistAtom],
});

export default walletState;
