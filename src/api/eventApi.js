const API_URL = `${import.meta.env.VITE_API_URL}/events`

export const getAllEvents = async () => {
    try {
        const eventsResponse = await fetch(`${API_URL}/`, {
            method: 'GET',
        })
        const eventList= await eventsResponse.json()
        console.log(eventList)
        return eventList

    }
    catch (e) {
        console.log(e)
        return null
    }
}

export const addUserToEvent = async (userID, eventID) => {
    try {
        const res = await fetch(`${API_URL}/${eventID}/addUser`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: userID })
            }
        )
        return await res.json()
    }
    catch (e) {
        console.log(e)
    }
}

export const getEventsForUser = async (userID) => {
    // try {
    //     const res = await fetch(`${API_URL}/${}`)
    // }
}