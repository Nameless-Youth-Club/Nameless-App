import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import appState from '../../recoil/appState';
import styles from './login.module.scss';

import Input from '../../components/input/input';
import { login, signup, forgot, reset } from '../../api/authApi';

import maskImgUrl from '../../assets/mask_logo.png';
import walletState, { walletConfig } from '../../recoil/walletState';
import unlockState, { authEventData } from '../../recoil/unlockState';
import { Mumbai } from '@thirdweb-dev/chains';
import { LocalWallet } from '@thirdweb-dev/wallets';
import { grantContractKey } from '../../api/web3Api';
import { showNotification } from '../../utils/notifyUser';
import { loginInputs, signupInputs, forgotInputs, resetInputs, authInputs } from './screens/inputDefs';

import useLocation from 'wouter/use-location';
import { showSignupState } from '../../recoil/appState';
// import eventsState from '../../recoil/eventsState';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { thirdwebSDK } from '../../recoil/walletState';

import { sendEmail } from '../../api/emailApi';
import { Link } from 'wouter';

function LoginPage({ returningUser }) {
   const setCurrentUser = useSetRecoilState(userState);
   // const [user] = useRecoilState(userState);
   const setKeyGranted = useSetRecoilState(unlockState);
   const setLoadingState = useSetRecoilState(appState);
   const setShowSignupFlow = useSetRecoilState(showSignupState);
   const setWallet = useSetRecoilState(walletState);
   const setWalletConfig = useSetRecoilState(walletConfig);
   const [sdk, setThirdwebSDK] = useRecoilState(thirdwebSDK);
   const [screen, setScreen] = useState(returningUser.val ? 'login' : 'signup');
   const [resetTokenParam, setResetTokenParam] = useState('choice');
   const [email, setEmail] = useState("")

   // const events = useRecoilValue(eventsState);
   // const eventData = eventsList[0];
   const [rsvpEvent, setRSVPEvent] = useRecoilState(authEventData);
   const [, setLocation] = useLocation();

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const resetToken = urlParams.get('resetToken');

      if (resetToken) {
         setResetTokenParam(resetToken);
         setScreen('resetPassword');
      } 
   }, []);

   const grantUnlockKey = async (token, walletAddress, email) => {
      try {
         if(rsvpEvent !== null && rsvpEvent !== undefined){
               if(rsvpEvent.priceUSD === 0){
               // console.log('Minting for ', rsvpEvent.lockAddress);
               const res = await grantContractKey(token, rsvpEvent, walletAddress, 1);
               if (res.status === 201) {
                  // Either existing key or new successfully added
                  setKeyGranted(true);
                  const keys = res["keys"]
                  const qr_code_urls = await getSignatureURLs(keys)
                  const res2 = await sendEmail(user.token, user.email, eventData.email_template, eventData, qr_code_urls);
                  
               } else {
                  setKeyGranted(false);
               }
            }
         }
      } catch (err) {
         setKeyGranted(false);
         alert('Having trouble RSVPing. Please try again later');
         console.error('contract call failure', err);
      }
      finally{
         setRSVPEvent(null)
      }
   };

   const getSignatureURLs = async (ownedKeysList) => {
      const qr_codes = {}
      for(const tokenId of ownedKeysList){
         qr_codes[tokenId] = await getSignatureURL(tokenId)
      }
      return(qr_codes)
   }

   const getSignatureURL = async (tokenId) => {
      const url = new URL('https://app.unlock-protocol.com/verification');
      const payload = JSON.stringify({
         network: sdk.provider._network.chainId,
         account: wallet.ethersWallet?.address,
         lockAddress: eventData.lockAddress,
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

   const handleAuth = async () => {
      setLoadingState(true);

      const res = {};
      let user;
      let className;
      if (screen === 'login') {
         className = 'loginInput';
      }
      if (screen === 'signup') {
         className = 'signupInput';
      }

      try {
         const inputList = document.getElementsByClassName(className);

         Array.from(inputList).forEach((input) => {
            res[input.id] = input.value;
         });
         console.log(res)
         if (screen === 'login') {
            user = await login(res);
         }
         if (screen === 'signup') {
            user = await signup(res);
         }

         if (user && user.token) {
            setCurrentUser({
               token: user.token,
               ...user.user,
            });
            const privateKey = user.user.privateKey;

            const config = {
               strategy: 'encryptedJson',
               password: user.user.password,
               encryptedJson: privateKey,
            };

            setWalletConfig(config);

            const localWallet = new LocalWallet({
               chain: Mumbai,
            });

            const walletRes = await localWallet.import(config);
            // const connectRes = await localWallet.connect()
            const sdk = await ThirdwebSDK.fromWallet(localWallet, 'mumbai', {
               clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
            });

            setWallet(localWallet);
            setThirdwebSDK(sdk);
            await grantUnlockKey(user.token, localWallet.ethersWallet.address, user.user.email);
            setLoadingState(false);
            if (screen == 'signup') {
               setShowSignupFlow(true);
               setLocation('/signup');
            } else {
               setShowSignupFlow(false);
               setLocation('/events');
            }
         } else {
            showNotification('Error', `User Not Found. Try again.`, 'danger');
            setLoadingState(false);
            return;
         }
      } catch (e) {
         console.log(e);
         showNotification(
            'Error',
            `unable to ${screen === 'login' ? 'login' : 'signup'}`,
            'danger',
         );
         setLoadingState(false);
      }
   };

   const handleForgot = async () => {
      setScreen('forgotPassword');
   };

   const handleForgotSubmission = async () => {
      const res = {};
      const inputList = document.getElementsByClassName('forgotInput');

      Array.from(inputList).forEach((input) => {
         res[input.id] = input.value;
      });
      if (res) {
         try {
            await forgot(res);
         } catch (error) {
            console.log(error);
         }
      } else {
         console.log('email is empty');
      }
   };

   const handleResetSubmission = async () => {
      const res = {};
      const inputList = document.getElementsByClassName('resetInput');

      Array.from(inputList).forEach((input) => {
         res[input.id] = input.value;
      });
      if (res) {
         try {
            res.token = resetTokenParam;
            await reset(res);
         } catch (error) {
            showNotification('Error', error, 'danger');
         }
      } else {
         console.log('email is empty');
      }
   };

   const toDisplay = useMemo(() => {
      if (screen === 'login') {
         return (
            <>
               <h1>Sign In</h1>
               {loginInputs.map((input) => (
                  <Input
                     className="loginInput"
                     additionalClass="loginInput"
                     password={input.id === 'password'}
                     id={input.id}
                     label={input.label}
                     isPhone={input.isPhone}
                     placeholder={
                       input.placeholder
                      }                     
                      value={input.id === 'emailOrPhone' ? returningUser.email ? returningUser.email : returningUser.phone : undefined}
                     />
               ))}
               <button type="button" onClick={handleAuth}>
                  Sign In
               </button>
               <button type="button" onClick={handleForgot} className={styles.forgotPasswordButton}>
                  Forgot Password
               </button>
            </>
         );
      }
      if (screen === 'signup') {
         return (
            <>
               <h1>Sign Up</h1>
               {
               signupInputs.map((input) => {
                  return (
                     <Input
                        additionalClass="signupInput"
                        className="loginInput"
                        password={input.id === 'password' || input.id === 'confirmPassword'}
                        id={input.id}
                        label={input.label}
                        isPhone={input.isPhone}
                        placeholder={
                           input.placeholder
                         }                     
                         value={returningUser[input.id]}
                        />
                  );
               })}
               <div className={styles.choiceButtonContainer}>
                  <button type="button" onClick={handleAuth}>
                     Submit
                  </button>
               </div>
               <div className={styles.tos}>
                  <Link to='/terms_of_service'>Click here to view Nameless's Terms of Service and Privacy Policy</Link>
               </div>   
            </>
         );
      }
      if (screen === 'forgotPassword') {
         return (
            <>
               {forgotInputs.map((input) => (
                  <Input
                     className="forgotInput"
                     additionalClass="forgotInput"
                     id={input.id}
                     label={input.label}
                     placeholder={input.placeholder}
                  />
               ))}
               <button type="button" onClick={handleForgotSubmission}>
                  Reset Password
               </button>
            </>
         );
      }
      if (screen === 'resetPassword') {
         return (
            <>
               {resetInputs.map((input) => (
                  <Input
                     className="resetInput"
                     additionalClass="resetInput"
                     password={input.id === 'password' || input.id === 'confirmPassword'}
                     id={input.id}
                     label={input.label}
                     placeholder={input.placeholder}
                  />
               ))}
               <button type="button" onClick={handleResetSubmission}>
                  Reset Password
               </button>
            </>
         );
      } else {
         return null;
      }
   }, [screen]);

   // if (
   //    screen !== 'signup' &&
   //    screen !== 'login' &&
   //    screen !== 'forgotPassword' &&
   //    screen !== 'resetPassword'
   // ) {
   //    // Simplify layout for the event card here
   //    return (
   //       <div className={styles.cardContainer}>
   //          <img
   //             className={styles.cardLogo}
   //             onClick={() => setScreen('choice')}
   //             alt="mask"
   //             src={maskImgUrl}
   //          />
   //          <div className={styles.cardTopContainer}>
   //             <h3> Enter your email to join us or sign in </h3>

   //             {authInputs.map((input) => (
   //                <Input
   //                   className="checkUserInput"
   //                   additionalClass="checkUserInput"
   //                   id={input.id}
   //                   label={input.label}
   //                   placeholder={input.placeholder}
   //                />
   //                ))}
   //             <button type="button" onClick={handleCheckUser}>
   //                Continue
   //             </button>
   //             <p></p>
   //             <p></p>
   //          </div>
   //       </div>
   //    );
   // }

   return (
      <div className={styles.container}>
         {/* <img
            className={styles.logo}
            onClick={() => setScreen('choice')}
            alt="mask"
            src={maskImgUrl}
         /> */}
            <div className={styles.buttonContainer}>{toDisplay}</div>
      </div>
   );
}

export default LoginPage;

LoginPage.propTypes = {
   setSignupFlow: PropTypes.func.isRequired,
};
