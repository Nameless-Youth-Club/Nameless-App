import React, { useState } from 'react';
import Popup from 'reactjs-popup'
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil'
// import { userRewardsState } from '../../recoil/userState';
import styles from './wallet.module.scss';
import walletState from '../../recoil/walletState';
import userState from '../../recoil/userState';

import { login } from '../../api/authApi';

function ExportPopup() {
    // const user = useRecoilState(userState)
    const [wallet, setWallet] = useRecoilState(walletState)
    const user = useRecoilState(userState)
    const walletAddress = wallet.ethersWallet.address
    const [password, setPassword] = useState()
    const [privateKey, setPrivateKey] = useState("")
    const [confirmText, setConfirmText] = useState("")

    const [isOpen, setIsOpen] = useState(true);

    var confirm_text = "";

    const getPrivateKey = async () => {
        const res = { "email": user[0].email, "password": password }
        const auth_user = await login(res);
        console.log(user[0].email)
        console.log(auth_user)
        try {
            if (auth_user.user.email == user[0].email && auth_user != undefined) {
                const config = { strategy: "privateKey", password: password }
                const priv_key = await wallet.export(config)
                setPrivateKey(priv_key)
                setConfirmText("")
            }
            else {
                setConfirmText("Incorrect password. Please re-enter and try again")
                setPrivateKey("")

            }
        }
        catch (error) {
            setConfirmText("Incorrect password. Please re-enter and try again")
            setPrivateKey("")
        }
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }


    return (
        <Popup
            open={isOpen} // Set open to true to display the popup by default
        // onClose={() => { }} // Define a function to handle the popup close event
        >
            <div
                className={styles.closeDetail}
                onClick={() => setIsOpen(false)}
                onKeyDown={() => setIsOpen(false)}
                role="presentation"
            >
                X
            </div>
            <div className={styles.popup}>
                <h3>Public Key</h3>
                <textarea className={styles.textArea} value={walletAddress} />
                <h3>Enter Your Password to Reveal Your Private Key: </h3>
                <input type="password" value={password} onChange={changePassword} />
                <h3 className={styles.confirmText}>{confirmText}</h3>
                <div className={styles.buttonContainer}>
                    <button onClick={getPrivateKey}>Reveal Private Key</button>
                </div>
                <textarea className={styles.textArea} value={privateKey} />
            </div>
        </Popup>
    );
}

export default ExportPopup;
