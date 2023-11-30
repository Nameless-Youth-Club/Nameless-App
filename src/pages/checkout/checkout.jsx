import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { checkPromoCode, createPaymentIntent, updatePromise } from "../../api/stripeApi";
import userState from "../../recoil/userState";
import CheckoutForm from "./checkoutForm";
import styles from "./checkout.module.scss";
import { useRecoilValue } from "recoil";
import { showNotification } from "../../utils/notifyUser";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function Checkout({ eventData, ticketTier }) {
  const user = useRecoilValue(userState)
  const [clientSecret, setClientSecret] = useState("");
  const [promoCode, setPromoCode] = useState("")
  const [price, setPrice] = useState(eventData.priceUSD)
  const [oldPrice, setOldPrice] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [promoCodeResponse, setPromoCodeResponse] = useState("")
  const [numTickets, setNumTickets] = useState(1)

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#cc24b5',
    },
  };

  const qtyOptions = Array.from({ length: 4 }, (_, index) => index + 1);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchClientSecret = async() => {
      try{
        const res =  await createPaymentIntent(user.token,eventData,numTickets, ticketTier=ticketTier)

        if (res.status === 201) {
          const response = await res.json();
          const secret = response.clientSecret
          setClientSecret(response.clientSecret)
          console.log(response.amount / 100)
          setPrice(response.amount / 100)
          setPaymentId(response.id)
        } 
        else {
          // Other error status codes, throw an error
          throw new Error('Unable to checkout at this time');
        }
      }
      catch(error){
        console.error(error)
      }
    }
    fetchClientSecret()

  }, []);

  var options= {clientSecret, appearance}


  const applyPromoCode = async(e)=>{
    try{
      console.log(promoCode)
      const res = await checkPromoCode(user.token, paymentId, promoCode, eventData, numTickets)
      if (res.status === 201) {
        const response = await res.json();
        setClientSecret(response.clientSecret)
        setOldPrice("$"+eventData.priceUSD)
        setPrice(response.amount / 100)
        console.log(response.amount / 100)
        setPaymentId(response.id)
        setPromoCodeResponse("Promo Code Applied")
      }
      else{
        setOldPrice("")
        setPromoCodeResponse("Invalid Promo Code")
      }
    }
    catch (err) {
      alert("Having trouble checking out right now. Please try again later")
      console.error(err);
    }
  }

  const updateNumTix = async(num) => {
    try{
      const res =  await updatePromise(user.token, paymentId, eventData, num, ticketTier=ticketTier)
      console.log(res)
      if (res.status === 201) {
        const response = await res.json();
        setPrice(response.amount / 100)
        console.log(response.amount / 100)
        setPaymentId(response.id)
        setClientSecret(response.clientSecret)
        

      } 
      else {
        // Other error status codes, throw an error
        throw new Error('Unable to checkout at this time');
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value.toUpperCase())
  }

  const handleNumTicketsChange = async(event) => {
    console.log("SetNum",parseInt(event.target.value))
    setNumTickets(parseInt(event.target.value));
    updateNumTix(parseInt(event.target.value))
  };


  return (
    <div className={styles.checkoutContainer}>
      {ticketTier && <p className={styles.price}>{ticketTier} </p>}
      <div className={styles.priceContainer}>
        <p className={styles.oldPrice}> {oldPrice} </p>
        <p></p>
        <p className={styles.price}> ${price} </p>
      </div>
      {/* <div className={styles.promoCodeContainer}>
        <p></p>
        <p></p>
        <p></p>
        <label htmlFor="promoCodeInput" className={styles.promoCodeLabel}>Promo Code:</label>
        <input
          id="promoCodeInput"
          type="text"
          value={promoCode}
          onChange={handlePromoCodeChange}
          className={styles.promoCodeInput}
        />
        <button className={styles.promoCodeButton} onClick={applyPromoCode}>Apply</button>
      </div>
      <p>{promoCodeResponse}</p> */}

      <div className={styles.numSelectContainer}>
        <label htmlFor="numSelect">QTY:</label>
        <select
          id="numSelect"
          className={styles.numSelect}
          value={numTickets}
          onChange={handleNumTicketsChange}
        >
          {qtyOptions.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      {clientSecret && (

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} eventData={eventData} ticketTier={ticketTier} numTickets={numTickets}/>
        </Elements>
      )}
    </div>
  );
}


