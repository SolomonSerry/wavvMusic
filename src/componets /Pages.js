import { useState, useEffect } from "react";
// import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const Pages = ({ pageIndex, setPageIndex, sliderRef, songList, setPageChange, pageChange }) => {

    const [disabled, setDisabled] = useState(false);
    const [sliderReset, setSliderReset] = useState();

    useEffect(()=>{
        // this is disables the previous page button when the user is at the first page index
        if(pageIndex === 0){
            setDisabled(true);
        } else if (pageIndex > 0) {
            setDisabled(false);
        }
    }, [pageIndex])

  
    const nextPage = () => {
        setPageIndex(pageIndex + 5);
        setSliderReset(1)
        setPageChange(false)
        
    }
    
    const prevPage = () => {
        setPageIndex(pageIndex - 5);
            setSliderReset(2)
            setPageChange(false)
            
        }
        
        // determines wheater to start on 0 index or last index oncee page changees 
        useEffect( ()=> {
            if (sliderReset === 1 && pageChange === true) {
                sliderRef.current.swiper.slideTo(0);
            } else if (sliderReset === 2 && pageChange === true) {
                sliderRef.current.swiper.slideTo(songList.length);       
        }
    },[pageChange, sliderRef, sliderReset, songList.length])
    return (
        <section>
            <div className="pagesBtnContainer wrapper">
                {!disabled ? 
                    <button className="pagePrev"
                    onClick={prevPage}
                    >
                
                        <FaArrowLeft />
                    
                
                    </button>
                    :
                    <button
                       className="disabledBtn"
                    >

                        <FaArrowLeft />


                    </button>

                }
                <button className="pageNext" onClick={nextPage}>
                    <FaArrowRight />
                </button>
            </div>
        </section>
    )
}

export default Pages;