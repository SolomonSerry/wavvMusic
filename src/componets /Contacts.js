import { GiSoundWaves } from 'react-icons/gi'

const Contacts = () => {

    return(
        <section>
            <div id='contact' className="infoContainer wrapper">
                <div className="logo">
                    <h2>.WAVV</h2>
                    <div className="soundWave">
                        <GiSoundWaves />
                    </div>
                </div>

                <div className="infoContent">
                    {/* <div className="info">
                        <p>About Imtiaz</p>
                        <ul>
                            <li><a href="https://www.imtiazrashid.com">Portfolio</a></li>
                            <li><a href="https://www.linkedin.com/in/imtiazrashid/">Linkedin</a></li>
                            <li><a href="https://github.com/irashid1">Github</a></li>
                        </ul>

                        
                    </div> */}

                    <div className="info">
                        <p>About Solomon</p>
                        <ul>
                            <li><a href="https://www.devsolo.ca/">Portfolio</a></li>
                            <li><a href="https://www.linkedin.com/in/solomon-serry-the-developer/">Linkedin</a></li>
                            <li><a href="https://github.com/SolomonSerry">Github</a></li>
                        </ul>
                    </div>
                </div>    
            </div>
        </section>
    )
}

export default Contacts