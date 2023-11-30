import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil'
// import { userRewardsState } from '../../recoil/userState';
import styles from './wallet.module.scss';
import walletState from '../../recoil/walletState';
import ExportPopup from './export';

function Wallet({ username }) {
   const [wallet, setWallet] = useRecoilState(walletState)
   const walletAddress = wallet.ethersWallet.address

   const [exportPopup, setExportPopup] = useState(false)

   const launchExportWindow = () => {
      setExportPopup(true)
   }

   const closePopup = () => {
      setExportPopup(false)
   }
   return (
      <div className={styles.container}>
         <div className={styles.topContainer}>
            <div className={styles.username}>
               <h1>@{username}</h1>
               <h3>Your Nameless Wallet Address:</h3>
            </div>
            <textarea className={styles.textArea} value={walletAddress} />
            <div>
               <h3>Nameless provides users with a Nameless Web3 wallet upon registration to help users earn, trade and use digital collectibles from their favorite events.</h3>
               <p />
               <h3>This wallet is exportable by the user and importable into any wallet provider. Doing so will allow you to retain all Nameless Rewards, but Nameless will no longer maintain custody of you wallet.</h3>
               <p />
               <h3>To Export Your Nameless Wallet please click the link below. You will be asked for your Nameless Password before revealing your private key.</h3>
            </div>
            <div className={styles.buttonContainer}>
               <button onClick={launchExportWindow}>Export Nameless Wallet</button>
               {exportPopup && <ExportPopup />}
            </div>
         </div>
      </div>
   );
}

export default Wallet;

Wallet.propTypes = {
   username: PropTypes.string.isRequired,
   // turn into array
   // rewards: PropTypes.shape({
   //    imgUrl: PropTypes.string.isRequired
   // })
};
