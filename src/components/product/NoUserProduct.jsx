import React from 'react';
import { useLocation } from 'wouter';
import styles from "./noUserProduct.module.scss"


function NoUserProduct({ imageSrc, imageName }) {
   const [_, setLocation] = useLocation()

   const handleImageClick = () => {
      setLocation('/auth');
   };

   return (
    <div className={styles.container}>
       <img
          src={imageSrc}
          alt="Image"
          className={styles.productImage}
          onClick={handleImageClick}
       />
       <p className={styles.productName}>{imageName}</p>
    </div>
 );
}


export default NoUserProduct;