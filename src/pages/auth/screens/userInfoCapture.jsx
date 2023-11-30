// import React from 'react'
// import Input from '../../../components/input/input';
// import { loginInputs, signupInputs } from './inputDefs';

// export const loginComponent =  (
//     <>
//                {loginInputs.map((input) => (
//                   <Input
//                      className="loginInput"
//                      additionalClass="loginInput"
//                      password={input.id === 'password'}
//                      id={input.id}
//                      label={input.label}
//                      placeholder={input.placeholder}
//                   />
//                ))}
//                <p></p>
//                <button type="button" onClick={handleAuth}>
//                   Sign In
//                </button>
//             </>
// )
// export const signupComponent = (
//     <>
//                {signupInputs.map((input) => {
//                   return (
//                      <Input
//                         additionalClass="signupInput"
//                         className="loginInput"
//                         password={input.id === 'password'}
//                         id={input.id}
//                         label={input.label}
//                         placeholder={input.placeholder}
//                      />
//                   );
//                })}
//                <div className={styles.choiceButtonContainer}>
//                <button type="button" onClick={handleAuth}>
//                   Submit
//                </button>
//                <p>or</p>
//                <button type="button" onClick={() => setScreen('login')}>
//                   Sign In
//                </button>
//                </div>
//             </>
// )