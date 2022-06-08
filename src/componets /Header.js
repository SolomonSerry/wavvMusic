import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'
// import { BsSoundwave } from 'react-icons/bs'
import { GiSoundWaves } from 'react-icons/gi'
// import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout, setShowModal, user, setHasAccount, hamburgerMenu, setHamburgerMenu, likedPageVisible, setLikedPageVisible }) => {

    console.log(likedPageVisible)

    return (
        <div className="headerContent wrapper">
            <div className="logo">
                <h2>.WAVV//</h2>
                <div className="soundWave">
                    <GiSoundWaves />
                </div>
            </div>

            <nav className='navText'>
                <ul>
                    <li><a href="#contact">Contact</a></li>
                    {user ?
                        <li>
                            {likedPageVisible ?
                                <Link to='/' onClick={ () => setLikedPageVisible(false)}> Home</Link>
                            :
                                <Link to='/liked' onClick={ () => setLikedPageVisible(true)}> Liked</Link>
                            }
                        </li>

                    :
                        null
                    }
                    <span>|</span>
                    {user ?
                        <li onClick={handleLogout}>Logout</li>
                        :
                        <div className="userLogin">
                            <li onClick={() => { setShowModal(true); setHasAccount(true) }} >Log in</li>
                            <li onClick={() => { setShowModal(true); setHasAccount(false) }} >Sign up</li>
                        </div>
                    }

                </ul>

            </nav>

            <nav className='navIcon'>
                {hamburgerMenu
                    ?
                    <>
                        <button onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                            <MdClose />
                        </button>

                        <ul className='menuActive'>
                            <li onClick={() => setHamburgerMenu(false)}><a href="#contact" >Contact</a></li>

                            {user ?
                                <>
                                    
                                    <li>
                                        {likedPageVisible ?
                                            <Link to='/' onClick={() => setLikedPageVisible(false)}> Home</Link>
                                            :
                                            <Link to='/liked' onClick={() => setLikedPageVisible(true)}> Liked</Link>
                                        }
                                    </li>
                                    <li onClick={handleLogout}>Logout</li>
                                </>

                                :
                                <div className="userLogin">
                                    <li onClick={() => { setShowModal(true); setHasAccount(true); setHamburgerMenu(false) }} >Log in</li>
                                    <li onClick={() => { setShowModal(true); setHasAccount(false); setHamburgerMenu(false) }} >Sign up</li>
                                </div>
                            }

                        </ul>
                    </>
                    :
                    <>
                        <button onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                            <FaBars />
                        </button>

                        <ul >
                            <li onClick={() => setHamburgerMenu(false)}><a href="#contact" >Contact</a></li>

                            {user ?
                                <>
                                    <li>
                                        {likedPageVisible ?
                                            <Link to='/' onClick={() => setLikedPageVisible(false)}> Home</Link>
                                            :
                                            <Link to='/liked' onClick={() => setLikedPageVisible(true)}> Liked</Link>
                                        }
                                    </li>
                                    <li onClick={handleLogout}>Logout</li>
                                </>
                                :
                                <div className="userLogin">
                                    <li onClick={() => { setShowModal(true); setHasAccount(true); setHamburgerMenu(false) }} >Log in</li>
                                    <li onClick={() => { setShowModal(true); setHasAccount(false); setHamburgerMenu(false) }} >Sign up</li>
                                </div>
                            }

                        </ul>
                    </>
                }


                {/* {
                    !hamburgerMenu ?

                        <>
                            <button onClick={setHamburgerMenu(!hamburgerMenu)}>
                                <MdClose />
                            </button>

                            <ul>
                                <li><a href="#contact">Contact</a></li>
                                {user ?
                                    <li onClick={handleLogout}>Logout</li>
                                    :
                                    <div className="userLogin">
                                        <li onClick={() => { setShowModal(true); setHasAccount(true) }} >Log in</li>
                                        <li onClick={() => { setShowModal(true); setHasAccount(false) }} >Sign up</li>
                                    </div>
                                }

                            </ul>
                        </>

                    :
                        <>
                            <button onClick={setHamburgerMenu(!hamburgerMenu)}>
                                <FaBars />
                            </button>

                            <ul>
                                <li><a href="#contact">Contact</a></li>
                                {user ?
                                    <li onClick={handleLogout}>Logout</li>
                                    :
                                    <div className="userLogin">
                                        <li onClick={() => { setShowModal(true); setHasAccount(true) }} >Log in</li>
                                        <li onClick={() => { setShowModal(true); setHasAccount(false) }} >Sign up</li>
                                    </div>
                                }

                            </ul>
                        </>
                } */}

            </nav>

        </div>
    )
}

export default Header