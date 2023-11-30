import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil'
import App from './App';
import './index.css';
import './global.scss';
import { ThirdwebProvider, localWallet, metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";

const activeChain = "mumbai"

// const appHeight = () => {
//    const doc = document.documentElement;
//    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
// };

// window.addEventListener('resize', appHeight);
// appHeight();

ReactDOM.createRoot(document.getElementById('root')).render(
   <ThirdwebProvider
      activeChain={activeChain}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
      supportedWallets={[
         localWallet(),
         coinbaseWallet(),
         metamaskWallet(),
         walletConnect(),
      ]}
   >
      <RecoilRoot>
         <React.Suspense fallback={<div>Loading...</div>}>
            <App />
         </React.Suspense>
      </RecoilRoot>
   </ThirdwebProvider>
);
