import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from '@rebass/forms';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import styles from './input.module.scss';

function StyledInput({ id, label, placeholder, password, value, additionalClass='', isPhone }) {
   return (
      <div className={styles.inputContainer}>
         <Label className={styles.label} htmlFor={id}>
            {label}
         </Label>
         {!isPhone ? <Input
            type={password ? 'password' : 'text'}
            className={`${styles.input} ${additionalClass}`}
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
         /> : <PhoneInput
               country={"us"}
               enableSearch={true}
               value={value}
               inputProps={{
                  name: id,
                  id: id,
                  style: {width: '100%', paddingTop: '.6em', paddingBottom: '.6em', borderRadius: '.5rem', backgroundColor: 'var(--theme-on-bg)'},
                  placeholder
               }} 
               inputClass={additionalClass}
               containerClass={`${styles.input} ${styles.phoneInput} ${additionalClass}`}
            />}
      </div>
   );
}

export default StyledInput;

StyledInput.propTypes = {
   id: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   placeholder: PropTypes.string.isRequired,
   password: PropTypes.bool.isRequired,
   additionalClass: PropTypes.string
};
