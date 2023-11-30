import React, { useEffect } from 'react';

function ShopifyBuyButton({ productId }) {
   useEffect(() => {
      (function () {
         var scriptURL =
            'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
         if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
               ShopifyBuyInit();
            } else {
               loadScript();
            }
         } else {
            loadScript();
         }
         function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (
               document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
            ).appendChild(script);
            script.onload = ShopifyBuyInit;
         }
         function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
               domain: 'nameless-marketplace.myshopify.com',
               storefrontAccessToken: '01b1b250a508c29b5e74484002e6103f',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {
               ui.createComponent('product', {
                  id: productId,
                  node: document.getElementById('product-component-1693178259587'),
                  moneyFormat: '%24%7B%7Bamount%7D%7D',
                  options: {
                     // ... (rest of the options)
                  },
               });
            });
         }
      })();
   }, []); // Empty dependency array ensures the effect runs only once after the initial render

   return (
      <div >
         <div id="product-component-1693178259587"></div>
      </div>
   );
}

export default ShopifyBuyButton;
