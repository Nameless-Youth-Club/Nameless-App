import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VerifyEmail from './verifyEmail';
import Walkthrough from './walkthrough';
import userState from '../../../../recoil/userState'
import styles from './signup.module.scss';
import { useRecoilValue, useRecoilState} from 'recoil';
import MintPFP from './mintPFP.jsx'
import { showSignupState } from '../../../../recoil/appState';
import { useLocation } from 'wouter'

function Signup({ setAuthed }) {
   const [showWalkthrough, setShowWalkthrough] = useState(true);
   const [showMintPFP, setShowMintPFP] = useState(false)
   const user = useRecoilValue(userState)
   // const [showSignup, setShowSignup] = useRecoilState(showSignupState);
   const [, setLocation] = useLocation()

   const handleFinish = () => {
      setLocation('/events')
   }

   // if(!showSignup){
   //    
   // }

   return (
      <div className={styles.container}>
         {/* {!showWalkthrough && <VerifyEmail setDone={setShowWalkthrough} />} */}
         {/* {!showMintPFP && <Walkthrough setDone={setShowMintPFP} />} */}
         {/* {showMintPFP && <MintPFP handleFinish={handleFinish}/>} */}
         <MintPFP handleFinish={handleFinish}/>

      </div>
   );
}

export default Signup;

Signup.propTypes = {
   setAuthed: PropTypes.func.isRequired,
};
