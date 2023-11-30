import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './eventsCheckoutCard.module.scss';
import { grantContractKey } from '../../api/web3Api';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import walletState, { walletConfig } from '../../recoil/walletState';
import appState from '../../recoil/appState';
import Popup from 'reactjs-popup';
import maskImgUrl from '../../assets/mask_logo.png';
import QRCode from 'qrcode.react';
import { useConnect, useSDK, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect } from 'react';
import { thirdwebSDK } from '../../recoil/walletState';
import { LocalWallet } from '@thirdweb-dev/wallets';
import { Mumbai } from '@thirdweb-dev/chains';
import { sendEmail } from '../../api/emailApi';
import Checkout from './checkout';
import CheckoutForm from '../checkout/checkoutForm';
import stripeLogo from '../../assets/stripe.svg';
import { showNotification } from '../../utils/notifyUser';
import useLocation from 'wouter/use-location';
import { authEventData } from '../../recoil/unlockState';
import { Link } from 'wouter';
import instagram from '../../assets/instagram_white.svg';

function EventCheckoutCard({ eventData}) {
   const user = useRecoilValue(userState);
   const [wallet, setWallet] = useRecoilState(walletState);
   const [sdk, setThirdwebSDK] = useRecoilState(thirdwebSDK);
   const [checkoutPopup, setCheckoutPopup] = useState(false);
   const config = useRecoilValue(walletConfig);
   const setLoadingState = useSetRecoilState(appState);
   const [location, setLocation] = useLocation()
   const setAuthEventData = useSetRecoilState(authEventData)
   const [selectedTicketTier, setSelectedTicketTier] = useState(null)


   const handleTicketTierClick = async (e) => {
      if(!user.id){
         setAuthEventData(eventData)
         setLocation('/auth')
      }
      else{
         e.stopPropagation();
         const tier = e.target.getAttribute('itemKey')
         console.log(tier)
         setSelectedTicketTier(tier)
         setCheckoutPopup(true);
      } 
   };

   return (
      <>
         <div
            className={styles.detailContainer}
            role="presentation"
            style={{ backgroundColor: eventData.cardColor}}
         >
            <div
               className={styles.topImage}
               style={{ backgroundImage: `url('${eventData.imgUrl}')`, 
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '429.8px'
                     }}
            /> {/* HEIGHT HERE IS SET TO THE PX HEIGHT OF DESIRED FLYERS ON CARDS BASED ON ASPECT RATIO OF IMG*/ }
            <div className={styles.bottom}>
                  {/* BUTTONS */}
                  <div className={styles.ticketTierContainer}>
                     {!eventData.ticketTiers && 
                        <button
                           className={styles.ticketButton}
                           onClick={handleTicketTierClick}
                        >
                           General ${eventData.priceUSD}
                        </button>
                     }
                     {eventData.ticketTiers &&
                        Object.entries(eventData.ticketTiers).map(([name, data]) => (
                           <button
                              className={styles.ticketButton}
                              onClick={handleTicketTierClick}
                              key={name}
                              itemKey={name}
                              itemValue={data}
                              disabled={data.amount <= 0}
                           >
                              {name} ${data.priceUSD}
                           </button>
                        ))
                     }
                  </div>

                  {/* EVENT NAME */}
                  <p className={styles.eventName}>{eventData.name}</p>


                  {/* EVENT DATE*/}
                  <div className={styles.dateContainer}>
                     <p>{eventData.date}</p>
                     <p className={styles.timeRange}>
                        {eventData.startTime} {eventData.endTime ? ` - ${eventData.endTime}` : ''}
                     </p>
                  </div>

                  {/* EVENT LOCATION */}
                  <div className={styles.location}>
                     <a className={styles.link} target='_blank' href={eventData.venue_url}>{eventData.venue}</a>
                     <a className={styles.link} target="_blank" href={eventData.location_url}>{eventData.location}</a>
                  </div>

                   {/* EVENT HOST */}
                   <div className={styles.hostInfo}>
                     <p>Hosted By:</p>
                     {eventData.vendors.map((vendor, index) => (
                        <div className={styles.hostDetails}>
                           <a className={styles.link} target='_blank' href={vendor.website}>{vendor.name}</a>
                           <a href={vendor.instagram} target='_blank'>
                              <img className={styles.instagramLogo} src={instagram}/>
                           </a>
                        </div>
                     ))}
                     <p></p>
                  </div>

               {/* EVENT DESCRIPTION */}
               <p className={styles.desc}>{eventData.description}</p> {/* Empty div to support grid layout */}
               </div>
         </div>
         {checkoutPopup && (
            <div className={styles.popup}>
               <div
                  className={styles.closeDetail}
                  onClick={() => {
                     setCheckoutPopup(false);
                  }}
                  onKeyDown={() => {
                     setCheckoutPopup(false);
                  }}
                  role="presentation"
               >
                  X
               </div>
               <div className={styles.checkoutContainer}>
                  <img className={`${styles.eventLogo}`} alt="eventlogo" src={eventData.imgUrl} style={{width: '100%', height: '429.8px'}} /> {/* CLASSNAMES IS A TEMP SOLUTION: Once we sort photo size remove this */}
                  <p className={styles.eventName}>{eventData.name}</p>
                  <div className={styles.checkoutForm}>
                     <Checkout eventData={eventData} ticketTier={selectedTicketTier} />
                  </div>
                  {/* <a href="https://stripe.com/" className={styles.stripeLogoContainer}>
                     <img className={styles.stripeLogo} src={stripeLogo} />
                  </a>
                  <div className={styles.tos}>
                     <Link to='/terms_of_service'>Click here to view Nameless's Terms of Service and Privacy Policy</Link>
                  </div>    */}
      
               </div>
            </div>
         )}
      </>
   );
}

export default EventCheckoutCard;
