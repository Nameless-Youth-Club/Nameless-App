import React, { useEffect, useState } from 'react';
import Product from '../../components/product/product';
import NoUserProduct from '../../components/product/NoUserProduct';

import styles from './market.module.scss';
import { useLocation } from 'wouter';
import { getAllProducts } from '../../api/shopifyApi';
import userState from '../../recoil/userState';
import { useRecoilValue } from 'recoil';

function marketPlace() {
   // const user = useRecoilValue(userState);
   const [_, setLocation] = useLocation();
   const currUserInfo = localStorage.getItem('recoil-persist');
   const [products, setProducts] = useState([]);
   const [images, setImages] = useState([]);

   useEffect(() => {
      // Define an async function to be called within the useEffect
      const fetchData = async () => {
         try {
            const response = await getAllProducts();
            const data = await response.json();
            console.log(data);
            setProducts(data.products);
            if (data.products.length > 0 )
            setImages(data.products[0].images);
         } catch (error) {
            console.log('ERROR FETCHING PRODUCTS');
         }
      };

      // Call the async function
      fetchData();
   }, []);

   return (
      <div className={styles.container}>
         <h1>market</h1>
         {currUserInfo == null && products?.length != 0 ? (
            <div className={styles.allProductsContainer}>
               {products &&
                  products?.map((product) => <NoUserProduct imageSrc={product.images[0].src} imageName={product.title}/>)}
            </div>
         ) : currUserInfo != null && products.length != 0 ? (
            <div className={styles.allProductsContainer}>
               {products && products?.map((product) => <Product productId={product.id} />)}
            </div>
         ) : (<>Coming Soon</>)
         }
      </div>
   );
}

export default marketPlace;
