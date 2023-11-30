import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Popup from 'reactjs-popup';
import eventsState from '../../recoil/eventsState'
import eventList from '../../assets/events/events';
import styles from './events.module.scss';
import { userFirstSignOnState } from '../../recoil/userState';
import maskImgUrl from '../../assets/mask_logo.png';
import { useLocation } from 'wouter';
import EventCard from './eventsCard';

import imgUrlOne from '../../assets/badco_5_year.png';
import walletState from '../../recoil/walletState';

function EventSplash( {eventId} ) {
   // const [popup, setPopup] = useState(false)
   // const [firstSignOn, setFirstSignOn] = useRecoilState(userFirstSignOnState)
   // useRecoilValue(eventsState)
   const [_, setLocation] = useLocation()
   // const currUserInfo = localStorage.getItem('recoil-persist')
   const event = eventList.find(e  => e.url_endpoint === eventId);
   console.log("Event", event)
   const [eventData, setEventData] = useState(event)


   useEffect(() => {
      if(eventData !== null && eventData !== undefined){
         console.log(eventData)
      }
      else{
         setLocation('/events')
      }

   }, []);

   return (
      <>      
         <div className={styles.container}>
            <h1></h1>
            <div className={styles.cardContainer}>
                  <EventCard eventData={eventData} splash={true}/>
            </div>
         </div>
      {/* <Popup
               open={popup || firstSignOn} // Set open to true to display the popup by default
               onClose={() => { setFirstSignOn(false) }}
            >
               <div
                  className={styles.closeDetail}
                  onClick={() => { setPopup(false); setFirstSignOn(false) }}
                  onKeyDown={() => { setPopup(false); setFirstSignOn(false) }}
                  role="presentation"
               >
                  X
               </div>
               <div className={styles.popup}>
                  <img className={styles.logo} alt="mask" src={maskImgUrl} />
                  <h2>Welcome to nameless…</h2>
                  <h3>Attend Events to Earn Rewards</h3>
                  <h3>Exchange them for exclusive items and experiences.</h3>
                  <h3>oGet started by using the following promo code for 50% off your ticket</h3>
                  <p></p>
                  <textarea className={styles.textArea} value="namelessgenesis" />
                  <p></p>
                  <p></p>
                  <a className={styles.customLink} href='https://posh.vip/e/bad-company-5year-anniversary'>TIX HERE</a>
               </div>
            </Popup> */}
      </>
   );
}

export default EventSplash;
