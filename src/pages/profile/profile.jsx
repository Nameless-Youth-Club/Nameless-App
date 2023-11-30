import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import styles from './profile.module.scss';
import { useEffect } from 'react';
import Reward from './reward';
import { useContract } from '@thirdweb-dev/react';
import { useOwnedNFTs } from '@thirdweb-dev/react';
import walletState, { pfpAddress, nftAddresses } from '../../recoil/walletState';
import eventsState from '../../recoil/eventsState';
import appState, { isPfpMinting } from '../../recoil/appState';
import userState from '../../recoil/userState';
import emptyPfp from '../../assets/pfps/empty-pfp.png'
import { MdSettings  } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { useLocation } from 'wouter';
import ContextMenu from '../../components/context-menu/context-menu'
import BounceLoader from "react-spinners/BounceLoader";



function Profile() {
   const [_, setLocation] = useLocation()
   const currUserInfo = localStorage.getItem('recoil-persist')
   //  console.log(currUserInfo)
    if (!currUserInfo) {
      //   console.log('wouter set loc for no user ionfo')
        setLocation('/auth')
        return null;
    }


   const appPfpAddress = useRecoilState(pfpAddress);
   const setLoadingState = useSetRecoilState(appState);
   const pfpMinting = useRecoilValue(isPfpMinting)
   const {
      ethersWallet: {
         address: walletAddress
      }
   } = useRecoilValue(walletState);
   // const walletAddress = wallet.ethersWallet.address;
   const [user] = useRecoilState(userState);
   
   const { contract: pfpsContract } = useContract(appPfpAddress[0]);
   const [pfps, setPfps] = useState([])

   const appNftAddresses = useRecoilValue(nftAddresses);
   // console.log(appNftAddresses)
   const nfts = useMemo(() => {
      // console.log(appNftAddresses)
      
      if (appNftAddresses?.length > 0) {
         // console.log(appNftAddresses)
         return appNftAddresses.map((nftAddress) => (
            <Reward nftAddress={nftAddress} walletAddress={walletAddress} />
         ))
      }
      else return null
   }, [appNftAddresses])


   
   // Handle PFP retreival and loading
   const [showPfpLoading, setShowPfpLoading] = useState(true)
   let {
      data: pfpsData,
      isLoading: pfpsLoading,
      error: pfpsError,
   } = useOwnedNFTs(pfpsContract, walletAddress);

   
   useEffect(() => {
      setShowPfpLoading(pfpsLoading)
      if (pfpsData && pfpsData[0]) {
         setPfps([pfpsData[0].metadata.image])
      }
      else {
         if (pfpsError !== null) {
            console.log(pfpsError)
         }
         setPfps([emptyPfp])
      }
   }, [pfpsData, pfpsLoading, pfpsError])



   


  

   
   const [showContextMenu, setShowContextMenu] = useState(false);


   const CONTEXT_MENU_DEFS = [
      {
         text: 'logout',
         link: null,
         onClick: () => {
            localStorage.clear();
            setLocation('/auth')
         }
      }
   ]

   

   const onIconClick = () => {setShowContextMenu(!showContextMenu)}

   return (
      <div className={styles.container}>
         <div className={styles.settingsIconContainer}>
            <IconContext.Provider value={useMemo(() => ({ size: '2em' }))}>
               <MdSettings onClick={onIconClick} />
            </IconContext.Provider>
            {showContextMenu && <ContextMenu items={CONTEXT_MENU_DEFS} />}
         </div>
         <div className={styles.topContainer}>
               { pfps.length > 0 && !pfpMinting && !showPfpLoading ? (
                  <div className={styles.pfp}>
                  <img
                     className={styles.pfpImg}
                     src={pfps[0]}
                     onClick={() => setProfileSetup(true)}
                     alt="User Profile Avatar"
                  />
                  </div>
               ) : (
                     <div className={styles.loader}>
                     <BounceLoader 
                        loading={pfpMinting || showPfpLoading}
                        // loading={true}
                        size={150}
                        color='#3A606E'
                        aria-label="Loading Spinner"
                        data-testid="loader"
                     />
                     </div>
               )}
            
            <div className={styles.username}>
               <h1>@{user.username}</h1>
               {/* <h3>{address}</h3> */}
            </div>
         </div>
         <h2>Collectibles</h2>
         <div className={styles.rewards}>
            {appNftAddresses?.length > 0 && nfts}
         </div>
         <div></div>
      </div>
   );
}

export default Profile;

Profile.propTypes = {
   username: PropTypes.string.isRequired,
};
