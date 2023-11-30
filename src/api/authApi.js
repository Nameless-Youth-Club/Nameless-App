import { Mumbai } from '@thirdweb-dev/chains';
import { LocalWallet } from '@thirdweb-dev/wallets';
import { showNotification } from '../utils/notifyUser';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
export const login = async ({ emailOrPhone, password }) => {
   try {
      const loginResponse = await fetch(`${API_URL}/sign-in`, {
         method: 'POST',
         body: JSON.stringify({
            [emailOrPhone.indexOf('@') > -1 ? 'email' : 'phone']: emailOrPhone.toLowerCase().replace(/\s/g, ""), //removes spaces,
            password,
         }),
      });

      if (loginResponse.status === 201) {
         const response = await loginResponse.json();
         return response; // Return the user object when login is successful
      } else {
         // Other error status codes, throw an error
         throw new Error('Unable to login');
      }
   } catch (e) {
      console.log('ERROR FROM LOGIN \n\n\n\n\n\n');
      console.log(e);
      throw new Error('Unable to login');
   }
};

export const checkUserExists = async (email) => {
   try {
      const userResponse = await fetch(`${API_URL}/check-user`, {
         method: 'POST',
         body: JSON.stringify({
            email: email.toLowerCase(),
         }),
      });
      const {existing} = await userResponse.json()
      return existing
   } catch (e) {
      console.log('ERROR FROM Check User \n\n\n\n\n\n');
      console.log(e);
      throw new Error('Unable to sent check user (request not sent)');
   }
};

export const checkUserExistsPhone = async (phone) => {
   try {
      const userResponse = await fetch(`${API_URL}/check-user-phone`, {
         method: 'POST',
         body: JSON.stringify({
            phone: phone,
         }),
      });
      const {existing} = await userResponse.json()
      return existing
   } catch (e) {
      console.log('ERROR FROM Check User \n\n\n\n\n\n');
      console.log(e);
      throw new Error('Unable to sent check user (request not sent)');
   }
};

export const signup = async ({ name, lastName, email, phone, password, confirmPassword, username }) => {
   try {
      const wallet = new LocalWallet({
         chain: Mumbai,
      });

      const config = { strategy: 'encryptedJson', password: password };

      // create a wallet
      await wallet.generate();

      //connect the wallet
      const walletAddress = await wallet.connect();

      //export the wallet
      const privateKey = await wallet.export(config);
      console.log(JSON.stringify({
         email: email.toLowerCase(),
         phone: phone?.replace(/\s/g, ""), //removes spaces
         password,
         confirmPassword,
         username,
      }))
      const signupResponse = await fetch(`${API_URL}/sign-up`, {
         method: 'POST',
         body: JSON.stringify({
            email: email.toLowerCase(),
            phone: phone?.replace(/\s/g, ""), //removes spaces
            password,
            confirmPassword,
            username,
         }),
      });
      const response = signupResponse.json();
      return response;
   } catch (e) {
      console.log('ERROR FROM SIGNUP \n\n\n\n\n\n');
      console.log(e);
      showNotification('Error', `unable to signup`, 'danger');
      return;
   }
};

export const forgot = async ({ email }) => {
   try {
      const forgotResponse = await fetch(`${API_URL}/forgot`, {
         method: 'POST',
         body: JSON.stringify({
            email: email.toLowerCase(),
         }),
      });

      if (forgotResponse.status === 201) {
         const response = await forgotResponse.json();
         showNotification('Success', `Email to reset password sent!`, 'success');

         return response; // Return the user object when login is successful
      } else {
         // Other error status codes, throw an error
         throw new Error('Unable to reset password email (request sent)');
      }
   } catch (e) {
      console.log('ERROR FROM Forgot \n\n\n\n\n\n');
      console.log(e);
      throw new Error('Unable to sent reset info (request not sent)');
   }
};

export const reset = async ({ password, confirmPassword, token }) => {
   try {
      const resetResponse = await fetch(`${API_URL}/reset`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            password,
            confirmPassword,
         }),
      });

      if (resetResponse.status === 201) {
         showNotification('Success', `Password successfully set -- Please log in`, 'success');

         // const response = await resetResponse.json();
         return; // Return the user object when login is successful
      }
      else if (resetResponse.status === 400) {
         const response = await resetResponse.json();
         console.log(response)
         console.log("++++++", response.errors)
         showNotification('Error', response.errors[0], 'danger');
      }
      else if (resetResponse.status === 401) {
         const response = await resetResponse.json();
         console.log(response)
         console.log("++++++", response.message)
         showNotification('Error', response.message, 'danger');
      }
   } catch (e) {
      console.log('ERROR FROM Reset');
   }
};
