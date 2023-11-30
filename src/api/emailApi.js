const API_URL = `${import.meta.env.VITE_API_URL}/email`;
const token =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDRlOGM1YzcxODk3YWMxYjZjNDQ0NTMiLCJpYXQiOjE2ODMzMTE0NDAsImV4cCI6MTY5MzMxMTQ0MH0.CNjO8TAaCvbaStPECvNLjY6mT8rY1ai3DFpE0N2_xJ4';

export const sendEmail = async (token, email, email_template, eventData, qr_code_urls) => {
   try {
      const emailResponse = await fetch(`${API_URL}/create`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            email,
            email_template,
            eventData,
            qr_code_urls
         }),
      });
      const response = await emailResponse.json();
      console.log('++++++++', response, '++++++++');
      return response;
   } catch (e) {
      console.log(e);
   }
};
