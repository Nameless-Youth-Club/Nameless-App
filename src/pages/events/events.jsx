import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Popup from 'reactjs-popup';
import eventsState from '../../recoil/eventsState';
// import eventList from '../../assets/events/events';
import styles from './events.module.scss';
import { userFirstSignOnState } from '../../recoil/userState';
import maskImgUrl from '../../assets/mask_logo.png';
import { useLocation } from 'wouter';
import EventCard from './eventsCard';
import { getAllEvents } from '../../api/eventApi';
import Switch from "react-switch"

import imgUrlOne from '../../assets/badco_5_year.png';
import walletState from '../../recoil/walletState';

function Events() {
   // const [popup, setPopup] = useState(false)
   // const [firstSignOn, setFirstSignOn] = useRecoilState(userFirstSignOnState)
  const [eventList, setEventList] =  useRecoilState(eventsState)

  useEffect(() => {

    const fetchEvents = async() => {
      try{
          const eventList = await getAllEvents()
          setEventList(eventList)
      }
      catch(e){
          console.error("Could not fetch events", e)
      }
    }

    fetchEvents()

  }, []);


   const [filter, setFilter] = useState('Nightlife'); // Track the active filter
   const [upcomingFilter, setUpcomingFiter] = useState(false)
 
   const handleFilterClick = (newFilter) => {
     setFilter(newFilter);
   };

   const handleUpcomingFilter = (e) => {
    setUpcomingFiter(e)
   }
 
   return (
      <>
       <div className={styles.container}>
         <h1>events</h1>
         <div className={styles.buttonContainer}>
           <button
             type="button"
             onClick={() => handleFilterClick('Nightlife')}
             className={filter === 'Nightlife' ? styles.activeButton : ''}
           >
             Nightlife
           </button>
           <button
             type="button"
             onClick={() => handleFilterClick('Activations')}
             className={filter === 'Activations' ? styles.activeButton : ''}
           >
             Activations
           </button>
         </div>
         <div className={styles.upcomingFilter}>
              <Switch className={styles.switch} onChange={handleUpcomingFilter} checked={upcomingFilter}/>
              <h3> Upcoming Only </h3>
         </div>
         <div className={styles.cardContainer}>
           {eventList
             .filter((event) =>
               !filter || (filter === 'Activations' && event.priceUSD === 0 && event.type !== 'nightlife') || (filter === 'Nightlife' && (event.priceUSD !== 0 || event.type==='nightlife'))
             )
             .filter((event) =>
                !upcomingFilter || (upcomingFilter && new Date(event.date) >= new Date())
             )
             .sort((a,b)=> new Date(b.date) - new Date(a.date))
             .map((event, index) => (
               <EventCard eventData={event} splash={false} key={index} />
             ))}
         </div>
       </div>
      </>
   );
 }
 
 export default Events;