const API_URL = `${import.meta.env.VITE_API_URL}/web3`;

export const grantContractKey = async (token, event, walletAddress, num, ticketTier=null) => {
   try {
      const res = await fetch(`${API_URL}/get-contract`, {
         method: 'POST',
         body: JSON.stringify({
            event,
            walletAddress,
            num,
            ticketTier
         }),
         headers: { Authorization: `Bearer ${token}` },
      });
      const response = await res.json();
      console.log(response)
      return response;
   } catch (e) {
      return null;
   }
};

export const mintPFPNFT = async (token, nftAddress, metadata, walletAddress, tokenId) => {
   try {
      const res = await fetch(`${API_URL}/mint-nft`, {
         method: 'POST',
         body: JSON.stringify({
            nftAddress,
            metadata,
            walletAddress,
            tokenId,
         }),
         headers: { Authorization: `Bearer ${token}` },
      });
      return res;
   } catch (e) {
      return null;
   }
};

export const web3 = () => {};
