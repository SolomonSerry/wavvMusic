import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import PlayMusic from "./PlayMusic";
import Pages from "./Pages";
import "swiper/css/bundle";
import toast, { Toaster } from "react-hot-toast";
import TextField from '@mui/material/TextField';

import { AiFillHeart } from "react-icons/ai"

import SwiperCore, { EffectCoverflow, Pagination, Virtual, Navigation } from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination, Virtual, Navigation]);



const GetMusic = ({ user, setShowModal, searchTerm, setSearchTerm, userInput, setUserInput, stopMusic, writeToDb }) => {



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

    // console.log(sliderRef)

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


    // once new set of tracks are render resets the swiiper to 0 index 
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

                }
            }).then((response) => {
                setSongList(response.data.tracks.hits);
                setUpdatedList(true); // has to be set after the songList since this is an async event
                setPageChange(true);
            }).catch(function (error) {
                setSearchTerm("");
                toast("Please Enter A Valid Input");
              
            });

        }

    }, [pageIndex, searchTerm, setSearchTerm])

    return (

        
        <div>
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 2500,
                    style: {
                        margin: '250px 0 0 0',
                        background: '#fbb034',
                    },

                }}
            />

            {user ?
                <form className="searchBar" onSubmit={handleSubmit}>

                    <TextField 
                    label="Search" 
                    onChange={handleChange} 
                    value={userInput} 
                    inputProps={inputProps} 
                    variant="filled"
                    />
                    
                    <button> Search </button>
                </form>

                :

                null
            }

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
                        >
                        
                            
                            <div className="coverFlow">
                                {songList.map((song, index) => {
                                    song.track.index = index; // putting trackIndex on to the song object

                                    return (
                                        <SwiperSlide key={song.track.key}>
                                            <div className="artContainer">
                                                <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} onClick={() => handlePlayPause(song.track)} key={song.track.key} />
                                                <div className="songInfoContainer">
                                                    <div>
                                                        <h3>{song.track.title}</h3>
                                                        <h4>{song.track.subtitle}</h4>
                                                    </div>
                                                    <button onClick={() => writeToDb(song)} >
                                                        <AiFillHeart />
                                                    </button>
                                                </div>
                                                
                                                
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                }

                            </div>
                            
                        </Swiper>
                                
                    </div>
                    {/* component that changes the pages */}
                    <Pages 
                    pageIndex={pageIndex} 
                    setPageIndex={setPageIndex} 
                    sliderRef={sliderRef} 
                    coverflowIndex={coverflowIndex} 
                    setCoverflowIndex={setCoverflowIndex} 
                    songList={songList} 
                    updatedList={updatedList} 
                    pageChange={pageChange} 
                    setPageChange={setPageChange} 
                    />
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


            {currentTrack ? <PlayMusic 
            currentTrack={currentTrack} 
            setCurrentTrack={setCurrentTrack} 
            playPause={playPause} 
            setPlayPause={setPlayPause} 
            songList={songList} 
            pageIndex={pageIndex} 
            setPageIndex={setPageIndex} 
            setUpdatedList={setUpdatedList} 
            updatedList={updatedList} 
            updatedPage={updatedPage} 
            setUpdatedPage={setUpdatedPage} 
            searchTerm={searchTerm} 
            user={user} 
            stopMusic={stopMusic} 
            coverflowIndex={coverflowIndex} 
            setCoverflowIndex={setCoverflowIndex} 
            sliderRef={sliderRef} /> 
            : null}
            {/* if current track exists then pass values into playMusic component. Otherwise return null */}

        </div>

    )


}

export default GetMusic;
