import React, { useState, useMemo } from 'react';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

import styles from './walkthrough.module.scss';
import walkthroughDefs from './walkthroughDefs';

function Walkthrough({ setDone }) {
   const [idx, setIdx] = useState(0);

   const handleContinue = (newVal) => {
      if (newVal === walkthroughDefs.length) {
         setDone(true);
      } else {
         setIdx(newVal);
      }
   };

   return (
      <div className={styles.container}>
         <IconContext.Provider value={useMemo(() => ({ size: '10rem' }))}>
            {walkthroughDefs[idx].icon}
         </IconContext.Provider>
         <h1>{walkthroughDefs[idx].title}</h1>
         {walkthroughDefs[idx].body && <p className={styles.walkthroughBody}>{walkthroughDefs[idx].body}</p>}
         <button type="button" onClick={() => handleContinue(idx + 1)}>
            Continue
         </button>
      </div>
   );
}

export default Walkthrough;

Walkthrough.propTypes = {
   setDone: PropTypes.func.isRequired,
};
