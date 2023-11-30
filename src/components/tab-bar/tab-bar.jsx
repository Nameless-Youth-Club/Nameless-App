import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdCalendarMonth, MdPerson2, MdShoppingBasket } from 'react-icons/md';
import { IconContext } from 'react-icons';
import styles from './tab-bar.module.scss';
import { Link } from 'wouter'
import maskImgUrl from '../../assets/mask_logo.png';

const data = [
   {
      label: 'Market',
      id: 'market',
      icon: <MdShoppingBasket />,
   },
   {
      label: 'Events',
      id: 'events',
      icon: <MdCalendarMonth />,
   },
   // {
   //    label: 'Rewards',
   //    id: 'rewards',
   //    icon: <MdStars />,
   // },
   {
      label: 'Profile',
      id: 'profile',
      icon: <MdPerson2 />,
   },

   // {
   //    label: 'Wallet',
   //    id: 'wallet',
   //    icon: <MdWallet />,
   // },

];

function TabBar({ handleClick, activeTab }) {
   console.log(activeTab)
   return (
      <div className={styles.container}>
         {/* <img className={styles.maskLogo} src={maskImgUrl} alt='nameless logo' style={{width: '100%'}} /> */}
         <IconContext.Provider value={useMemo(() => ({ size: '2em' }))}>
            {data.map((tab) => (
               <Link href={`/${tab.id}`}>
               <button
                  type="button"
                  className={styles.tabContainer}
                  onClick={() => handleClick(tab.id)}
                  disabled={activeTab === tab.id}
               >
                  <div className={styles.tabIcon}>{tab.icon}</div>
                  <p className={styles.tabLabel}>{tab.label}</p>
               </button>
               </Link>
            ))}
         </IconContext.Provider>
         <p className={styles.copyright}>&#169; 2023 nameless</p>
      </div>

   );
}

export default TabBar;

TabBar.propTypes = {
   handleClick: PropTypes.func.isRequired,
   activeTab: PropTypes.func.isRequired,
};
