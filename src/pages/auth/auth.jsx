import React, { useEffect, useState } from 'react';
import styles from './auth.module.scss'
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil'
import appState from '../../recoil/appState';
import userState from '../../recoil/userState';
import Input from '../../components/input/input'

import { useSetRecoilState } from 'recoil';

import Login from './Login';
import { checkUserExists, checkUserExistsPhone } from '../../api/authApi';

function Auth({ setUser }) {
   const [returningUser, setReturningUser] = useState({val: undefined, email: null, phone: null})
   const setLoadingState = useSetRecoilState(appState);
   const [method, setMethod] = useState("email")

   useEffect(() => {
      const currUserInfo = localStorage.getItem('recoil-persist')
      if (currUserInfo) {
         window.location = '/events'
      }
   }, [])
   
   
   useEffect(() => {
      console.log(returningUser)
   }, [returningUser])



   const handleCheckUser = async () => {
      setLoadingState(true)
      const val = document.getElementById('checkUserInput').value
      console.log(val)
      const isEmail = method === 'email' 

      const userExists = isEmail ? await checkUserExists(val) : await checkUserExistsPhone(val.replace(/\s/g, "")) //removes spaces
      setLoadingState(false)
      setReturningUser({val: userExists, [isEmail ? 'email' : 'phone']: val})
      console.log(returningUser)

      // if(method === 'email'){
      //    const email = document.getElementById('emailCapture').value
      //    const userExists = await checkUserExists(email)
      //    setLoadingState(false)
      //    setReturningUser({val: userExists, email: email})
      // }
      // if(method === 'phone'){
      //    const phone = document.getElementById('phoneCapture').value
      //    const userExists = await checkUserExistsPhone(phone)
      //    setLoadingState(false)
      //    setReturningUser({val: userExists, phone: phone})         
      // }
   }

   const handleMethodClick = (newMethod) => {
      setMethod(newMethod);
    };
  

   
   if (returningUser.val === undefined) {
      return (
         <div className={styles.emailCaptureContainer}>
               <h1> Enter your email or phone</h1>
               <div className={styles.buttonContainer}>
                  <button
                     type="button"
                     onClick={() => handleMethodClick('email')}
                     className={method === 'email' ? styles.activeButton : ''}
                  >
                     Email
                  </button>
                  <button
                     type="button"
                     onClick={() => handleMethodClick('phone')}
                     className={method === 'phone' ? styles.activeButton : ''}
                  >
                     Phone
                  </button>
               </div>
               <div className={styles.inputContainer}>
                  <Input
                     className="checkUserInput"
                     additionalClass="phoneCapture"
                     id='checkUserInput'
                     label=''
                     placeholder={method === 'phone' ? '(222) 222-2222' : 'nameless@nameless.nyc'}
                     isPhone={method === 'phone'}
                  />              </div>
               <button type="button" onClick={handleCheckUser}>
                  Continue
               </button>
            
         </div>
      )
   }


   // Email verified, pass to Login with right screen
   return <Login setUser={setUser} returningUser={returningUser}/>;
}

export default Auth;

Auth.propTypes = {
   setUser: PropTypes.func.isRequired,
};
