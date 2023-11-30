const API_URL = `${import.meta.env.VITE_API_URL}/stripe`


export const createPaymentIntent = async (token, eventData, numTickets, ticketTier = null) => {
    try {
        const res = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            body: JSON.stringify({
                eventData,
                numTickets,
                ticketTier
            }),
            headers: { Authorization: `Bearer ${token}`}
        })
        return res
    }
    catch (e) {
        console.log(e)
        return null
    } 
}

export const checkPromoCode = async (token, id, promoCode, eventData, numTickets) => {
    try {
        const res = await fetch(`${API_URL}/apply-promo-code`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                promoCode,
                eventData,
                numTickets
            }),
            headers: { Authorization: `Bearer ${token}`}
        })
        return res
    }
    catch (e) {
        console.log(e)
        return null
    } 
}

export const updatePromise = async (token, id, eventData, numTickets, ticketTier=null) => {
    try {
        console.log("Update ", numTickets)
        const res = await fetch(`${API_URL}/update-promise`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                eventData,
                numTickets,
                ticketTier
            }),
            headers: { Authorization: `Bearer ${token}`}
        })
        return res
    }
    catch (e) {
        console.log(e)
        return null
    } 
}