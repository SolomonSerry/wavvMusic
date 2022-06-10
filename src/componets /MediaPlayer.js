import { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { Slider } from "@mui/material";


const MediaPlayer = ({ audioRef, playPause, setPlayPause, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex, trackProgress, onScrub, onScrubEnd, trackDuration, setUpdatedPage, nextTrack }) => {

    const [mute, setMute] = useState(false);
    const [velocity, setVelocity] = useState(100);

    

    const togglePlayPause = () => {
        // control function for the play/pause button
        setPlayPause(!playPause)
        if (playPause === true) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }

    const prevTrack = () => {

        // control function for the previous track button
        if (audioRef.current.currentTime > 2) {
            // if the track has been playing for more than 2 seconds, it will restart the track
            audioRef.current.currentTime = 0;
        } else {
            if (currentTrack.index === 0) {
                // if current track is the first index of the current list, it will go back to the previous list
                setPageIndex(pageIndex - 5);
                setUpdatedPage(true);
            } else {
                // goes back to the previous track index within the same list
                const prev = currentTrack.index - 1;
                setCurrentTrack(songList[prev].track);
                audioRef.current.play();
            }
        }
    }

    const timeCalc = (value) => {
        let seconds = Math.floor(value % 60);
        let minutes = Math.floor((value / 60) % 60);
        
        if (seconds < 10) {
            seconds = "0" + seconds;
        };

        return minutes + ":" + seconds;
    };

//  console.log(audioRef.current.volume)

    // controls the mute state for scrub
    useEffect(() => {
        audioRef.current.volume = velocity / 100;
  
        if (audioRef.current.volume === 0) {
            setMute(true)
        } else {
            setMute(false)
        }

    }, [audioRef, velocity])

    // function to handle volume change 
    const volumeChange = (event) => {
        setVelocity(event.target.value)
    }

    // function to handle change
    const muteTrack = () => {
        setMute(!mute)
    }

    // handles volume if button is used and not scrub
    useEffect(() => {
        if (mute === true) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = velocity / 100;
        }
    }, [audioRef, mute, velocity])

    return (

        <div className="mediaPlayer">

            <div className="mediaContainerTop">
            <div className="trackInfo">
                <img src={currentTrack.images.coverart} alt={`album cover for ${currentTrack.title}`} />
                <div className="coverArtTitle">
                    <h3>{currentTrack.title}</h3>
                    <h4>{currentTrack.subtitle}</h4>
                </div>
            </div>

            <div className="mediaContainer">
                <div className="mediaButtons">

                    <button onClick={() => prevTrack()}>
                        <IoPlaySkipBack />
                    </button>
                        <button className="playPause" onClick={() => togglePlayPause()}>
                            {playPause ? <FaPlay /> : <FaPause />}
                        </button>
                    <button onClick={() => nextTrack()}>
                        <IoPlaySkipForward />
                    </button>

                </div>

                <div className="mediaTime">
                    <p> 
                        { trackProgress ?
                            timeCalc(trackProgress)
                            :
                            "0:00"
                        }
                    </p>
                    <label className="sr-only" htmlFor="trackScrub">Track Scrub</label>

                        <Slider 
                        className='slider' 
                        step={0.0001} 
                        value={trackProgress} 
                        onChange={(e) => onScrub(e.target.value)} 
                        onMouseUp={onScrubEnd} 
                        onKeyUp={onScrubEnd} 
                        max={trackDuration}  
                        />
                    
                    <p> -
                        {trackDuration ?
                            timeCalc(trackDuration - audioRef.current.currentTime)
                            :
                            "0:00"
                        }
                    </p>
                </div>
            </div>

            <div className="volumeControls">

                {mute ?

                    <button onClick={() => muteTrack()}>
                        <HiVolumeOff />
                    </button>
                    :
                    <button onClick={() => muteTrack()}>
                        <HiVolumeUp />
                    </button>
                }

                {/* volume */}
                <label className="sr-only" htmlFor="volumeInput">Volume</label>

                    <Slider 
                    className='volumeRange slider' 
                    step={1} 
                    min={0} 
                    max={100} 
                    onChange={volumeChange} 
                    value={mute ? 0 : velocity} 
                    />

            </div>
            
            </div>

                {/* on media queries the track title ges to the bottom */}
            <div className="trackTitle">
                <div className="mediaTimeBottom">
                    <p>
                        {trackProgress ?
                            timeCalc(trackProgress)
                            :
                            "0:00"
                        }
                    </p>
                    <label className="sr-only" htmlFor="trackScrub">Track Scrub</label>

                    <Slider 
                    className='slider' 
                    step={1} 
                    value={trackProgress} 
                    onChange={(e) => onScrub(e.target.value)} 
                    onMouseUp={onScrubEnd} 
                    onKeyUp={onScrubEnd} 
                    max={trackDuration} 
                    />
                    <p>
                        {trackDuration ?
                            timeCalc(trackDuration)
                            :
                            "0:00"
                        }
                    </p>
                </div>
                  
                <p className="titleTicker"><span>{`${currentTrack.title}`}</span> - {`${currentTrack.subtitle}`}</p>
                  
            </div>
        </div>
    )

}



export default MediaPlayer;