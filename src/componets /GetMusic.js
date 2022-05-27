import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import PlayMusic from "./PlayMusic";
import Pages from "./Pages";
import "swiper/css/bundle";
import toast, { Toaster } from "react-hot-toast";
import TextField from '@mui/material/TextField';

// import { BiError } from "react-icons/bi"

// import { SwiperStyles } 

import SwiperCore, { EffectCoverflow, Pagination, Virtual, Navigation } from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination, Virtual, Navigation]);



const GetMusic = ({ user, setShowModal, searchTerm, setSearchTerm, userInput, setUserInput, stopMusic }) => {



    // states 


    const [songList, setSongList] = useState([]);

    const [currentTrack, setCurrentTrack] = useState();

    const [playPause, setPlayPause] = useState(false); // determines whether the song is in play or pause state

    const [updatedList, setUpdatedList] = useState(false); // state used for keeping the track playing on the background while user searches for a new term or changing page index
    const [updatedPage, setUpdatedPage] = useState(false);

    //for pages 
    const [pageIndex, setPageIndex] = useState(0);

    const [coverflowIndex, setCoverflowIndex] = useState(0);

    const [pageChange, setPageChange] = useState(false);

    // const [errorPage, setErrorPage] = useState(false);

    const sliderRef = useRef();

    const inputProps = {
        name: "Search",
        placeholder: "Search For Music"
    }

    

    

    // resetLandingPage(setSearchTerm);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
        setUpdatedList(false);
        setPageIndex(0); // resets the page index to 0 every time user searches for a new track
        // sliderRef.current.swiper.slideTo(0)  
        
    }

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const handlePlayPause = (event) => {

        if (event === currentTrack) {
            setPlayPause(!playPause);
        } else {
            setCurrentTrack(event);
            setPlayPause(false);
        }

    } // this determines whether we pause/play the current track or play a new track

    useEffect(()=> {
        if (updatedList === true) {
             sliderRef.current.swiper.slideTo(0) 
        }
    },[updatedList])


    // axios call
    useEffect(() => {

        if (searchTerm) {
            axios({
                method: 'GET',
                url: 'https://shazam.p.rapidapi.com/search',
                params: {
                    term: searchTerm,
                    locale: 'en-US',
                    offset: pageIndex,
                    limit: '5'
                },
                headers: {
                    // current key 
                    // Solomon key#2
                    'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    'x-rapidapi-key': '8b686888demsh8b501dde66c5b3dp12f3d2jsn655350bd72a5'
                    
                    // additional keys
                    
                    // Solomon key#1
                    // 'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    // 'x-rapidapi-key': '4e6f74d025msh36947ff6c814c7cp11d0c1jsnc6f9a4f67eae'

                    // Imtiaz key #1
                    // 'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    // 'x-rapidapi-key': 'cd2f669506mshbacf9d2b7d2169ep15ef89jsnb7d5c64abf1d'

                    // Imtiaz key#2
                    // 'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    // 'x-rapidapi-key': 'cd74434576msh2f5cc3adcc9d925p11959ejsnfe4483674b62' 
                }
            }).then((response) => {
                // setErrorPage(false)
                setSongList(response.data.tracks.hits);
                setUpdatedList(true); // has to be set after the songList since this is an async event
                setPageChange(true);
            }).catch(function (error) {
            //   console.log(toast("Hello"))
                setSearchTerm("");
                // setErrorPage(true);
                toast("Please Enter A Valid Input");
              
            });

        }

    }, [pageIndex, searchTerm, setSearchTerm])

    return (

        
        <div>
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        margin: '250px 0 0 0',
                        background: '#fbb034',
                    },

                }}
            />

            {user ?
                <form className="searchBar" onSubmit={handleSubmit}>
                    {/* <label className="sr-only" htmlFor="search"> Search For Music </label>
                    <input placeholder="Search For Music" type="text" id="search" onChange={handleChange} value={userInput} /> */}
                    <TextField label="Search" onChange={handleChange} value={userInput} inputProps={inputProps} variant="filled"/>
                    <button> Search </button>
                </form>

                :

                null
            }

            {/* {errorPage ? 
                <div className="errorImg">
                    <BiError />
                </div>
            :

            null

            } */}

            {searchTerm ?
                <>
                    <div className="mySwiper wrapper">

                        <Swiper
                            navigation
                            ref={sliderRef}
                            effect={"coverflow"}
                            grabCursor={true}
                            // centeredSlides={true}
                            onSlideChange={(e) => setCoverflowIndex(e.activeIndex)}
                            spaceBetween={50}
                            // // slidesPreView={"auto"}
                            // // loop={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}

                            pagination={{
                                clickable: true,
                            }}

                            

                            // virtual={true}
                            // modules={[EffectCoverflow, Pagination, Virtual, Navigation]}

                        // className="mySwiper"
                        >
                        
                            
                            <div className="coverFlow">
                                {songList.map((song, index) => {
                                    song.track.index = index; // putting trackIndex on to the song object

                                    return (
                                        <SwiperSlide key={song.track.key}>
                                            <div className="artContainer" onClick={() => handlePlayPause(song.track)} key={song.track.key}>
                                                <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} />
                                                <h3>{song.track.title}</h3>
                                                <h4>{song.track.subtitle}</h4>
                                                
                                                
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                }

                            </div>
                            
                        </Swiper>
                                
                    </div>

                    <Pages pageIndex={pageIndex} setPageIndex={setPageIndex} sliderRef={sliderRef} coverflowIndex={coverflowIndex} setCoverflowIndex={setCoverflowIndex} songList={songList} updatedList={updatedList} pageChange={pageChange} setPageChange={setPageChange} />
                </>
                :


                <div className="tagLine">
                    <h1>.WAVV// Music.</h1>
                    <p>Search For The New Wave</p>
                    {!user ?
                        <button onClick={() => setShowModal(true)}>Get Started</button>
                        :
                        null
                    }
                </div>

            }


            {currentTrack ? <PlayMusic currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} playPause={playPause} setPlayPause={setPlayPause} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} setUpdatedList={setUpdatedList} updatedList={updatedList} updatedPage={updatedPage} setUpdatedPage={setUpdatedPage} searchTerm={searchTerm} user={user} stopMusic={stopMusic} coverflowIndex={coverflowIndex} setCoverflowIndex={setCoverflowIndex} sliderRef={sliderRef} /> : null}
            {/* if current track exists then pass values into playMusic component. Otherwise return null */}

        </div>

    )


}

export default GetMusic;
