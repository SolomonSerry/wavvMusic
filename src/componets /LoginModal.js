import { useSpring, animated } from "react-spring"
import { RiCloseFill } from "react-icons/ri"
import TextField from '@mui/material/TextField';
// import { FcGoogle } from 'react-icons/fc'
import { GiSoundWaves } from 'react-icons/gi'

const LoginModal = ({ email, setEmail, password, setPassword, handleLogin, handleSignUp, emailError, passwordError, hasAccount, setHasAccount, showModal, setShowModal,googleLogin }) => {



    // states for firebase


    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `opacity(0%)` : `opacity(100%)`, 
        
        
        
    });

    const emailProps = {
        name: "email",
        // placeholder: "Search For Music"
        type: "email",
    }
    
    const passwordProps = {
        name: "password",
        // placeholder: "Search For Music"
        type: "password"
    }


    return (
        
        <>
            {showModal ?
                <div className="modalContainer">

                    <animated.div style={animate}>
                        <div className="modalContent">
                            <form>

                                <>
                                    <div className="modalHeader">
                                        <p>.WAVV//<span><GiSoundWaves /></span></p>
                                        <div className="closeIcon" onClick={ () => setShowModal(false) }>
                                            <RiCloseFill />
                                        </div>
                                    </div>

                                    {/* <div className="providerLogin">
                                        <button onClick={googleLogin}>
                                            <FcGoogle />
                                        </button>
                                    </div> */}

                                    <div className="loginInfo">
                                        
                                        <div className="inputField">
                                            {/* <label htmlFor="userEmail"> Email </label>
                                            <input type="email" id="email" required onChange={ (e) => setEmail(e.target.value)} value={email}/> */}
                                            <TextField label="Search" onChange={(e) => setEmail(e.target.value)} value={email} inputProps={emailProps} variant="filled" />
                                            <p className="errorMessage">{emailError}</p>
                                        </div>

                                        <div className="inputField">
                                            {/* <label htmlFor="userPassword"> Password </label>
                                            <input type="password" id="password" required onChange={ (e) => setPassword(e.target.value)} value={password}/> */}
                                            <TextField label="Password" onChange={(e) => setPassword(e.target.value)} value={password} inputProps={passwordProps} variant="filled" />
                                            <p className="errorMessage">{passwordError}</p>
                                        </div>

                                    </div>

                                  
                                        { hasAccount ?
                                        <>
                                            <button onClick={handleLogin}> Sign In </button>
                                            <div className="loginToggle">
                                                <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}> Sign up</span></p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <button onClick={handleSignUp}> Sign up </button>
                                            <div className="loginToggle">
                                                <p>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}> Sign In</span></p>
                                            </div>
                                        </>
                                        }

                                    

                                </>

                            
                            </form>
                        </div>
                    </animated.div>
                    
                </div>
                : null

            }
        </>
    )

}

export default LoginModal