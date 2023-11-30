import React, { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState} from "recoil";
import userState from "../../recoil/userState";
import walletState from "../../recoil/walletState";
import appState from '../../recoil/appState';
import { grantContractKey } from "../../api/web3Api";
import { sendEmail } from "../../api/emailApi";
import useLocation from "wouter/use-location";
import { showNotification } from "../../utils/notifyUser";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./checkout.module.scss";


export default function CheckoutForm( {clientSecret, eventData, ticketTier, numTickets} ) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useRecoilValue(userState)
  const wallet = useRecoilValue(walletState)
  const user_email = user.email
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const setLoadingState = useSetRecoilState(appState);


  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Please select a payment method.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingState(true);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
        setLoadingState(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // return_url: window.location.protocol + '//' + window.location.host + '/events',
          },
          redirect: 'if_required'
        });    
        if (paymentIntent.status==='succeeded') {
            try{
                // console.log(eventData.email_template)
                const res = await grantContractKey(user.token, eventData, wallet.ethersWallet?.address, numTickets, ticketTier=ticketTier);
                const res2 = await sendEmail(user.token, user_email, eventData.email_template);
                showNotification('Success', `RSVP complete -- check email for confirmation`, 'success');
              }
            catch (e){
              showNotification(
                'Error',
                `We had an error processing your purchase.`,
                'danger',
                );
                console.log(e)
            }
            finally{
                console.log("Finally")
                setLoadingState(false);
                setLocation('/profile')
            }
          
        } 
        if(error) {
          showNotification(
            'Error',
            `unable to purchase tickets at this time`,
            'danger',
            );
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
              } else {
                setMessage("An unexpected error occurred.");
              }
        }
      } catch (err) {
        alert("An error occurred. Please try again later.");
        console.error("Error:", err);
      }
      finally{
        setLoadingState(false);
      }
      setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  // const linkAuthenticationElement = elements.create("linkAuthentication", {defaultValues: {email: "foo@bar.com"}});

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      <p></p>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

