import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './eventsCard.module.scss';
import { grantContractKey } from '../../api/web3Api';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import walletState, { walletConfig } from '../../recoil/walletState';
import appState from '../../recoil/appState';
import QRCode from 'qrcode.react';
import { useConnect, useSDK, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect } from 'react';
import { thirdwebSDK } from '../../recoil/walletState';
import { LocalWallet } from '@thirdweb-dev/wallets';
import { Mumbai } from '@thirdweb-dev/chains';
import { sendEmail } from '../../api/emailApi';
import { showNotification } from '../../utils/notifyUser';
import useLocation from 'wouter/use-location';
import { authEventData } from '../../recoil/unlockState';
import { Link } from 'wouter';
import instagram from '../../assets/instagram_white.svg';

function EventCard({ eventData, splash}) {
   const [detailView, setDetailView] = useState(false);
   const user = useRecoilValue(userState);
   const [wallet, setWallet] = useRecoilState(walletState);
   const [sdk, setThirdwebSDK] = useRecoilState(thirdwebSDK);
   const [ticketPopup, setTicketPopup] = useState(false);
   const [qrUrls, setQRUrls] = useState(null);
   const config = useRecoilValue(walletConfig);

   const [subscribed, setSubscribed] = useState(false);
   const [ownedKeys, setOwnedKeys] = useState({});
   const [subscribedLoading, setSubscribedLoading] = useState(false);
   const setLoadingState = useSetRecoilState(appState);
   const [location, setLocation] = useLocation()
   const setAuthEventData = useSetRecoilState(authEventData)
   const [keysLoading, setKeysLoading] = useState(false)

   const currentDate = new Date().setHours(0,0,0,0) // handle time later
   const ro_sdk = new ThirdwebSDK('mumbai')

   async function getEventKeys(){
      setKeysLoading(true)
      const contracts = eventData.ticketTiers
      ? Object.values(eventData.ticketTiers).map(ticketTier => ticketTier.lockAddress)
      : [eventData.lockAddress];
      const owned = {}
      for(const con of contracts){
         const contract = await ro_sdk.getContract(con);
         const keyData = await contract.erc721.getOwned(wallet.ethersWallet?.address)

         if (keyData && keyData.length > 0) {
            const keys = keyData.map((key) => key.metadata.tokenId);
            owned[con] = keys;
            setSubscribed(true);
          }
      }
      setOwnedKeys(owned);
      setKeysLoading(false)
   }

   useEffect(() => {
      if(splash){
         setDetailView(true)
      }
      if(!user.id){
         setSubscribedLoading(false);
      }
      else{
         setSubscribedLoading(keysLoading); // Only set app loading state if page content is being returned (ie the events themselves). Offload subscribed call to background
         getEventKeys()
      }

   }, [keysLoading]);

   const navigateToCheckout = (event) => {
      const newRoute = `/checkout/${eventData.url_endpoint}`
      setLocation(newRoute)
   }

   const handleCardClick = () => {
      setDetailView(!detailView);
   };

   const handleRsvpClick = async (e) => {
      if(!user.id){
         setAuthEventData(eventData)
         setLocation('/auth')
      }
      else{
         e.stopPropagation();
         if (eventData.priceUSD > 0) {
            navigateToCheckout();
         } else {
            setLoadingState(true);
            try {
               const res = await grantContractKey(user.token, eventData, wallet.ethersWallet?.address, 1);
               const keys = res["keys"]
               const qr_code_urls = await getSignatureURLs(keys)
               console.log(qr_code_urls)
               const res2 = await sendEmail(user.token, user.email, eventData.email_template, eventData, qr_code_urls);
            } catch (err) {
               console.error('contract call failure', err);
               showNotification('Error', `Having trouble RSVPing. Please try again later`, 'danger');
            } finally {
               setLoadingState(false);
               showNotification('Success', `RSVP complete -- check email for confirmation`, 'success');
            }
         }
      }
   };

   const handleTicketClick = async (e) => {
      e.stopPropagation();
      setSignatureURLs();
      setTicketPopup(true);
   };

   const setSignatureURLs = () => {
      console.log(ownedKeys)
      const qr_codes = {...qrUrls}
      Object.entries(ownedKeys).forEach(async ([lockAddress, ownedKeys]) => {
         //Only create signature url if note done already
         for(const tokenId of ownedKeys){
            if(qr_codes[lockAddress] === undefined){
               qr_codes[lockAddress] = {}
            }
            if(!(tokenId in qr_codes[lockAddress])){
               qr_codes[lockAddress][tokenId] = await getSignatureURL(lockAddress, tokenId)
            }
         }       
      });
      console.log(qr_codes)
      setQRUrls(qr_codes)
   }

   const getSignatureURLs = async (ownedKeysList) => {
      const qr_codes = {}
      for(const tokenId of ownedKeysList){
         qr_codes[tokenId] = await getSignatureURL(tokenId)
      }
      return(qr_codes)
   }

   const getSignatureURL = async (lockAddress, tokenId) => {
      const url = new URL('https://app.unlock-protocol.com/verification');
      const payload = JSON.stringify({
         network: sdk.provider._network.chainId,
         account: wallet.ethersWallet?.address,
         lockAddress: lockAddress,
         timestamp: Date.now(),
         tokenId: tokenId,
      });

      const localWallet = new LocalWallet({
         chain: Mumbai,
      });
      const walletRes = await localWallet.import(config);
      // const connectRes = await localWallet.connect()
      const new_sdk = await ThirdwebSDK.fromWallet(localWallet, 'mumbai', {
         clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
      });

      setWallet(localWallet);
      setThirdwebSDK(new_sdk);

      const signature = await new_sdk.wallet.sign(payload);
      const data = encodeURIComponent(payload);
      const sig = encodeURIComponent(signature);
      url.searchParams.append('data', data);
      url.searchParams.append('sig', sig);
      return url.toString();
   };

   const getButtonText = () => {
      if (subscribed && !subscribedLoading) {
         return 'My Ticket';
      }
      if (!subscribed && !subscribedLoading) {
         return 'RSVP';
      }
      return (
         <BounceLoader
            loading={rewardLoading}
            // loading={true}
            size={20}
            color="#3A606E"
            aria-label="Loading Spinner"
            data-testid="loader"
         />
      );
   };

   return (
      <>
         <div
            className={`${styles.container} ${detailView ? styles.detailContainer : ''}`}
            onKeyDown={handleCardClick}
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
               onClick={subscribed && eventData.lockAddress ? handleTicketClick: () => {}}
            /> {/* HEIGHT HERE IS SET TO THE PX HEIGHT OF DESIRED FLYERS ON CARDS BASED ON ASPECT RATIO OF IMG*/ }
            <div className={styles.bottom} onClick={handleCardClick}>


                  {/* EVWNT NAME */}
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
                     {!subscribed && eventData.priceUSD > 0 && <p>${eventData.priceUSD}</p>}
                  </div>

                   {/* EVENT HOST */}
                   {eventData.vendors && <div className={styles.hostInfo}>
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
                  </div>}

               {/* EVENT DESCRIPTION */}
               {detailView ? <p className={styles.desc}>{eventData.description}</p> : <div className={styles.noDesc} />} {/* Empty div to support grid layout */}
               {/* BUTTONS */}
               {!subscribed && eventData.lockAddress && eventData.priceUSD > 0 && new Date(eventData.date).valueOf() >= currentDate.valueOf() && (
                  <button type="button" className={styles.reserveButton} onClick={handleRsvpClick}>
                     Buy Tix
                  </button>
               )}
               {!subscribed && eventData.lockAddress && eventData.priceUSD <= 0 && new Date(eventData.date).valueOf() >= currentDate && (
                  <button type="button" className={styles.reserveButton} onClick={handleRsvpClick}>
                     RSVP
                  </button>
               )}
               {subscribed && eventData.lockAddress && new Date(eventData.date).valueOf() >= currentDate && (
                  <button
                     type="button"
                     className={styles.reserveButton}
                     onClick={handleTicketClick}
                  >
                     My Tickets
                  </button>
               )}
               {subscribed && eventData.lockAddress &&eventData.priceUSD > 0 && new Date(eventData.date).valueOf() >= currentDate && (
                  
                  <a 
                     onClick={navigateToCheckout}
                     className={styles.buyMoreLink}
                  >
                     Buy More Tickets
                  </a>
               )}
               </div>
         </div>
         {/* Should move pop-ups to separate components and import at events.js level. We dont need a set for every card, just one for whatever user clicks */}
         {ticketPopup && (
            <div className={styles.ticketPopup}>
               <div
                  className={styles.closeDetail}
                  onClick={() => {
                     setTicketPopup(false);
                  }}
                  onKeyDown={() => {
                     setTicketPopup(false);
                  }}
                  role="presentation"
               >
                  X
               </div >
               <p></p>
               <p></p>
               <div className={styles.ticketContainer}>
                  {Object.entries(ownedKeys).map(([lockAddress, ticketIds]) => (
                     ticketIds.map((tokenId, index) => (
                        <div className={styles.ticket} style={{border: `2px solid ${eventData.cardColor}`}}>
                           <p className={styles.eventName}>{eventData.name}</p>
                           <img className={styles.eventLogo} alt="eventlogo" src={eventData.imgUrl} style={{width: '100%', height: '429.8px'}} />
                           <p>Ticket Id {tokenId}</p>

                           <div className={styles.qrCodeContainer}>
                              {/* style={{ height: window.innerHeight * 0.35, width: window.innerHeight * 0.35 }} */}
                              <QRCode
                                 className={styles.qrCode}
                                 imageSettings={{height: window.innerHeight * 0.35, width: window.innerHeight * 0.35}}

                                 value={qrUrls[lockAddress][tokenId]}
                              />
                              <p></p>
                              <p></p>
                           </div>
                        </div>
                     ))
                  ))}
               </div>
            </div>
         )}
      </>
   );
}

export default EventCard;

EventCard.propTypes = {
   eventData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string,
      tz: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   }).isRequired,
};
