import { log } from "console";
import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import SilkSlider from "react-slick";
import STORAGEKEY from "../../config/APP/app.config";
import AuthStorage from "../../helper/AuthStorage";
import { getCarousel } from "../../redux/actions/carouselAction";
import { getCoursesAction } from "../../redux/actions/courseAction";


const Slider = () => {

  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [bannerSelected, setBannerSelected] = useState(true)
  const [carousel, setCarousel] = useState([])
  const userid = AuthStorage.getStorageData(STORAGEKEY.userId)
  const language = AuthStorage.getStorageData(STORAGEKEY.language)

  const carouselData = useSelector((state: any) => state.carouselData.getCarousel)
  const getLanguageNameData = useSelector((state: any) => state.languageData.getLanguageByName)

  useEffect(() => {
    if (language) {
      dispatch(getCarousel(perPage, pageNumber))
    }
  }, [perPage, pageNumber, getLanguageNameData, userid, language])

  useEffect(() => {
    if (language) {
      dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", bannerSelected))
    }
  }, [perPage, pageNumber, bannerSelected, userid, language])

  useEffect(() => {
    if (carouselData && carouselData.data && carouselData.data.data) {
      setCarousel(carouselData.data.data.sort((a: any, b: any) => a.priority - b.priority))
    }
  }, [carouselData])


  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          autoplay: false,
          arrows: false,
        }
      },
    ]
  };



  return (
    <>
      <div className="carousel-slider ">
        <SilkSlider {...settings}>

          {carousel ? carousel.map((item: any, i: number) =>
            <>
              <img src={item.imageUrl} alt="" className='slider-bg' key={i} />
              <Container>
                <div className="learn-hearo-text">
                  <div className=" set-slider-text">
                    <h3>
                      {item.title}
                    </h3>
                    {/* <div className="d-flex gap-2">
                      <img src="../assets/img/history.png" alt="" />
                      <p>
                        {item.duration}</p>
                    </div> */}
                  </div>
                </div>
              </Container>
              {item.ctaButtonText &&
                <div className="position-relative">
                  {console.log('🎈', item.ctaButtonLink)}
                  <button className="ctaBTN" onClick={() => window.open(`${item.ctaButtonLink}`, '_blank')}>{item.ctaButtonText}</button>
                </div>
              }
            </>
          ) : <div className="slider-white-space"></div>}
        </SilkSlider>

      </div>
    </>
  );
};

export default Slider;
