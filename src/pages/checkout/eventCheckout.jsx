import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Popup from 'reactjs-popup';
import eventsState from '../../recoil/eventsState'
import eventList from '../../assets/events/events';
import styles from './eventCheckout.module.scss';
import { useLocation } from 'wouter';
import EventCheckoutCard from './eventsCheckoutCard';

function EventCheckout( {eventId} ) {
   const [_, setLocation] = useLocation()
   const event = eventList.find(e  => e.id === eventId);
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
                  <EventCheckoutCard eventData={eventData} checkout={true}/>
            </div>
         </div>
      </>
   );
}

export default EventCheckout;
