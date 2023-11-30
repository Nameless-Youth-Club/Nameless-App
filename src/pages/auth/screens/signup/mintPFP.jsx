import React, { useState, useEffect } from 'react';
import styles from './mintPFP.module.scss';
import userState from '../../../../recoil/userState';
import walletState from '../../../../recoil/walletState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mintPFPNFT } from '../../../../api/web3Api';
import appState, { showSignupState, isPfpMinting } from '../../../../recoil/appState';

import blue from '../../../../assets/pfps/blue.svg';
import red from '../../../../assets/pfps/red.svg';
import green from '../../../../assets/pfps/green.svg';
import yellow from '../../../../assets/pfps/yellow.svg';
import pink from '../../../../assets/pfps/pink.svg';
import purple from '../../../../assets/pfps/purple.svg';

const images = [blue, red, green, yellow, pink, purple];

const imagesToIpfs = [
   'https://ipfs.thirdwebstorage.com/ipfs/QmVSV8aQiji9m9tihMBYGwXrQjZAwf7sgVtc28UEfzp1td/blue.png',
   'https://ipfs.thirdwebstorage.com/ipfs/QmeF7FDdCU315GECqFrQEb1zXPKuHtZSckr7gZj3uxshzf/red.png',
   'https://ipfs.thirdwebstorage.com/ipfs/QmVSV8aQiji9m9tihMBYGwXrQjZAwf7sgVtc28UEfzp1td/green.png',
   'https://ipfs.thirdwebstorage.com/ipfs/QmeF7FDdCU315GECqFrQEb1zXPKuHtZSckr7gZj3uxshzf/yellow.png',
   'https://ipfs.thirdwebstorage.com/ipfs/QmeF7FDdCU315GECqFrQEb1zXPKuHtZSckr7gZj3uxshzf/pink.png',
   'https://ipfs.thirdwebstorage.com/ipfs/QmeF7FDdCU315GECqFrQEb1zXPKuHtZSckr7gZj3uxshzf/purple.png',
];

function MintPFP({handleFinish}) {
   const user = useRecoilValue(userState);
   const [chosenImg, setChosenImg] = useState(images[0]);
   const [nftMinted, setNFTMinted] = useState(false);
   // const setLoadingState = useSetRecoilState(appState);
   // const setShowSignupFlow = useSetRecoilState(showSignupState);
   const setPfpMinting = useSetRecoilState(isPfpMinting)
   const handleImageClick = (url, index) => {
      setChosenImg(url);
   };

   const [mintRes, setMintRes] = useState(null)

   useEffect(() => {
      if (!mintRes) {
         return
      }
      if (mintRes?.status === 201) {
         // Either existing key or new successfully added
         setNFTMinted(true);
         return
      }
      setPfpMinting(true)
   }, [mintRes])
   

   //const contractAddress = "0x8353F8a01FE609Fa35B7297b2dF4dCe8d0a0B21c"
   const SFTAddress = '0xd1B7732a973b2AE18519dF56B51394a46Ae35973';
   const wallet = useRecoilValue(walletState);
   const walletAddress = wallet.ethersWallet.address;
   // const { contract } = useContract(contractAddress);
   // const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

   const mint = async () => {
      const metadata = [];
      const tokenId = images.indexOf(chosenImg);
      try {
         setPfpMinting(true);
         // Dont want to await this req as its not critical to user. Show loading on profile instead
         mintPFPNFT(user.token, SFTAddress, metadata, walletAddress, tokenId);

         
      } catch (err) {
         setNFTMinted(false);
         console.log(err);
         alert(
            'Having trouble Minting PFP Rignt Now. No worries though, we can mint you one later.',
         );
      } finally {
         setPfpMinting(false);
         handleFinish()
      }
   };

   return (
      <div className={styles.container}>
         <h1>Secure your place…</h1>
         <p className={styles.bodyText}>
            Select your mask to create your unique nameless ID, once generated it will appear in
            your account.
         </p>
         <div className={styles.pfp}>
            <img className={styles.pfpImg} src={chosenImg} alt="User Profile Avatar" />
         </div>
         <button className={styles.button} type="button" onClick={() => mint()}>
            Done
         </button>
         <div className={styles.maskGrid}>
            {images.map((imageUrl, index) => (
               <img
                  key={index}
                  src={imageUrl}
                  alt={`${index}`}
                  className="grid-image"
                  onClick={() => handleImageClick(imageUrl, index)}
               />
            ))}
         </div>
      </div>
   );
}

export default MintPFP;
