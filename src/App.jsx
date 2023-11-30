import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ReactNotifications } from 'react-notifications-component'
import { Route, useLocation } from "wouter";
import { Auth, Events, Profile, Market, EventSplash, EventCheckout, TOS } from './pages';
import Signup from './pages/auth/screens/signup/signup';
import userState from './recoil/userState';
import appState, { showSignupState } from './recoil/appState';
import styles from './app.module.scss';
import TabBar from './components/tab-bar/tab-bar';
import 'react-notifications-component/dist/theme.css';
// import eventsList from './assets/events/events.js';
import eventsState from './recoil/eventsState';
import masksgif from './assets/masks.gif'
import { nftAddresses } from './recoil/walletState';
import { getAllEvents } from './api/eventApi';
// actions test comment

function App() {
   const user = useRecoilValue(userState);
   const loading = useRecoilValue(appState);
   const [location, setLocation] = useLocation();
   const [events, setEventsState] = useRecoilState(eventsState);
   const [eventNFTs, setEventNFTs] = useRecoilState(nftAddresses);

   const setNfts=(events)=>{
      const nfts = []
      for(const event of events){
         if(event.ticketTiers){
            Object.values(event.ticketTiers).forEach(tier => {
               if(!(tier.lockAddress in nfts)){
                  nfts.push(tier.lockAddress)
               }
            });
         }
         else{
            if(!(event.lockAddress in nfts)){
               nfts.push(event.lockAddress)
            }
         }
      }
      console.log("NFTs", nfts)
      setEventNFTs(nfts)
   }

   useEffect(() => {
      const fetchEvents = async() => {
         try{
            const eventList = await getAllEvents()
            setEventsState(eventList)
            setNfts(eventList)
         }
         catch(e){
            console.error("Could not fetch events", e)
         }
      }

      fetchEvents()
      // To handle back button we need to pull the local storage each app load to make sure it still exists
      const currUserInfo = localStorage.getItem('recoil-persist')
      if (!currUserInfo) {
         if (location !== '/market' && !location.includes('/event/') && location !== '/auth' && location !== '/terms_of_service') {
            setLocation('/events')
            return;
         }
      }
      else if (!user.id) {
         if (location !== '/market' && !location.includes('/event/') && location !== '/auth' && location !== '/terms_of_service') {
            setLocation('/events');
            return
         }
      }
      else {
         setLocation(location === '/' ? '/events' : location)
         return
      }
   }, []);

   return (
      <>
         <div className={styles.parentContainer}>
            <div className={`${location !== '/auth' && location !== '/signup' && location !== '/terms_of_service' ? styles.container : styles.noTabContainer}`}>
               <Route path='/signup'><Signup /></Route>
               <Route path='/auth'><Auth /></Route>
               <Route path='/events'><Events /></Route>
               <Route path='/profile'><Profile /></Route>
               <Route path='/market'><Market /></Route>
               <Route path='/event/:event_id'>
                  {params => <EventSplash eventId={params.event_id} />}
               </Route>
               <Route path='/checkout/:event_id'>
                  {params => <EventCheckout eventId={params.event_id} />}
               </Route>
               <Route path='/terms_of_service'><TOS /></Route>

            </div>


            {loading && <div className={styles.loadingOverlay}><img className={styles.masksgif} src={masksgif} alt="Mask GIF" /></div>}
            <ReactNotifications />
         </div>
         {location !== '/auth' && location !== '/signup' && location !== '/terms_of_service' && <div className={styles.tabs}><TabBar activeTab={location.split('/')[1]} /></div>}
      </>
   );
}

export default App;
