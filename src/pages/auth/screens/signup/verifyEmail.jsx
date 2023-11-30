import React from 'react';
import PropTypes from 'prop-types';
import styles from './verifyEmail.module.scss';

import maskImgUrl from '../../../../assets/mask.png';

function VerifyEmail({ setDone }) {
   return (
      <div className={styles.container}>
         <img className={`${styles.image} ${styles.mask}`} alt="mask" src={maskImgUrl} />
         <h1 className={styles.textOne}>Verify Your E-Mail</h1>
         <p className={styles.textTwo}>Check your email, we&#39;ve sent a confirmation code</p>
         <div className={`${styles.confirmationContainer} ${styles.code}`}>
            <input />
            <input />
            <input />
            <span />
            <input />
            <input />
            <input />
         </div>
         <button className={styles.button} type="button" onClick={() => setDone(true)}>
            Continue
         </button>
         <p className={styles.textThree}>Didn&#39;t receive a code? Resend.</p>
      </div>
   );
}

export default VerifyEmail;

VerifyEmail.propTypes = {
   setDone: PropTypes.func.isRequired,
};
