import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import BounceLoader from "react-spinners/BounceLoader";

import styles from './reward.module.scss';


function Reward({ nftAddress, walletAddress }) {
   // console.log(nftAddress)
   const [isDetail, setIsDetail] = useState(false);
   const {contract} = useContract(nftAddress);
   const {
      data,
      isLoading,
      error,
   } = useOwnedNFTs(contract, walletAddress)

   const [nftForDisplay, setNftForDisplay] = useState({})

  useEffect(() => {
      if (data?.length > 0) {
          setNftForDisplay({
              name: data[0]['metadata']['name'],
              dateEarned: data[0]['metadata']['attributes'][1]['value'],
              description: data[0]['metadata']['description'],
              imgUrl: data[0]['metadata']['image'],
              attributes: data[0]['metadata']['attributes'],
           })
      }
  }, [data, isLoading, error])

  if (isLoading) {
      return <BounceLoader 
      loading={isLoading}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
      
   />
  }
  if (error) {
      return <p>Error</p>
  }

  if (!nftForDisplay.imgUrl) {
   return null
  }

   if (isDetail) {
      return (
         <div className={styles.detailContainer}>
            <div
               style={{
                  background: `url('${nftForDisplay.imgUrl}')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
               }}
               className={styles.detailTopImage}
            />
            <div className={styles.detailInfoContainer}>
               <p>{nftForDisplay.name}</p>
               <p>{nftForDisplay.dateEarned}</p>
               <p className={styles.rewardDescription}> {nftForDisplay.description}</p>
               {/* {reward.attributes.map((item) => (
                  <p>{item["trait_type"]}: {item["value"]}</p>
               ))} */}
            </div>
            <div
               className={styles.closeDetail}
               onClick={() => setIsDetail(false)}
               onKeyDown={() => setIsDetail(false)}
               role="presentation"
            >
               X
            </div>
         </div>
      );
   }
   return (
      <div
         className={styles.preview}
         style={{
            backgroundImage: `url('${nftForDisplay.imgUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: '2px solid white'

         }} onClick={() => setIsDetail(true)}
         onKeyDown={() => setIsDetail(true)}
         role="presentation"
      />
   )
}

export default Reward;

Reward.propTypes = {
   reward: PropTypes.shape({
      name: PropTypes.string,
      dateEarned: PropTypes.string,
      description: PropTypes.string,
      imgUrl: PropTypes.string,
   }).isRequired,
};
