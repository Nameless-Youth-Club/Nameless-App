const API_URL = `${import.meta.env.VITE_API_URL}/rewards`

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDRlOGM1YzcxODk3YWMxYjZjNDQ0NTMiLCJpYXQiOjE2ODMzMTE0NDAsImV4cCI6MTY5MzMxMTQ0MH0.CNjO8TAaCvbaStPECvNLjY6mT8rY1ai3DFpE0N2_xJ4'

export const getRewardsForUser = async (userID) => {
    try {
        const res = await fetch(`${API_URL}/user/${userID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}