import React from 'react'
import { Col, Row } from 'react-bootstrap';
import SilkSlider from "react-slick";
import AcquireCard from '../../../common/AcquireCard';

const Employment_Entrepreneurship = () => {
    const acquirenewskillsdata = [
        {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
          {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
          {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
        {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
          {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
          {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Read More",
            link: "",
          },
    ]

    const acquirenewskills = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    centerMode: true,
                    centerPadding: "220px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: "120px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 574,
                settings: {
                    centerMode: true,
                    centerPadding: "30px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    }


    return (
        <div className="know-employee container-xxl px-0 pb-5">
            <div className="title mt-4 mb-4">
                <h1>Employment & Entrepreneurship</h1>
            </div>
            {/* <SilkSlider {...acquirenewskills}>
                {
                    acquirenewskillsdata.map((item) => (
                        <div className="p-2">
                            <AcquireCard
                                img={item.img}
                                title={item.title}
                                text={item.text}
                                btntext={item.btntext}
                                link={item.link}
                                isShowRating={false}
                            />
                        </div>
                    ))
                }
            </SilkSlider> */}
            <Row className="gy-3">
                {acquirenewskillsdata.map((item) => (
                    <Col lg="4">
                        <AcquireCard
                            img={item.img}
                            title={item.title}
                            text={item.text}
                            btntext={item.btntext}
                            link={item.link}
                            isShowRating={false}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Employment_Entrepreneurship