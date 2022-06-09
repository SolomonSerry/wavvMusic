import toast, { Toaster } from 'react-hot-toast';

const LikedMusic = ({ likedSongs, handleRemove }) => {

    return (
        <section className="likedMusic wrapper">
            <h2>Liked// Music</h2>
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
            {likedSongs.map( (liked) => {
                console.log(liked.song)
                return(
                  <div className="likedSongContainer">
                      <div className="likedSongInfo">
                        <img src={liked.song.images.coverart} alt={`Coverart of ${liked.song.title}`} />
                        <div>
                            <h3>{liked.song.title}</h3>
                            <h4>{liked.song.subtitle}</h4>
                        </div>
                      </div>
                        <button onClick={() => {handleRemove(liked); toast("Removed")}}>Remove</button>
                  </div>
                )
            })}


        </section>
       
    )
}

export default LikedMusic