import React, { useState, useEffect, Component, useMemo, useCallback, useReducer, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
// import required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Card, Col, Row } from 'antd';

const CollectionSlider = ({ images }) => {
    const [screenSize, setScreenSize] = useState(null);
    const [activeArt, setActiveArt] = useState(1);


    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (screenSize < 480) {
            setActiveArt(2);
        } else if (screenSize < 900) {
            setActiveArt(2);
        } else if (screenSize < 1200) {
            setActiveArt(4);
        } else if (screenSize < 1500) {
            setActiveArt(5);
        } else if (screenSize > 1500) {
            setActiveArt(7);
        }
    }, [screenSize]);




    useEffect(() => {
        console.log('images', images)
    }, [images])


    const imagesArray = []
    for (let i = 1; i < 34; i++) {
        imagesArray.push(i)
    }

    const metadataArray = []
    for (let i = 1; i < 34; i++) {
        const metaObj = require(`./metadata/${i}.json`)
        // console.log('metaObj', i, metaObj)

        const { "721": a } = metaObj
        // console.log('metaObj', i, a)

        const { "a513b9456ba94f38fff8fe201254e075ca1ffe12edc4b21b0125db10": b } = a
        // console.log('metaObj', i, b)
        const key = `Lucky Mints${i}`
        const { [key]: c } = b
        const { Background, Mint, Flower } = c
        // console.log('metaObj', i, Background, Mint, Flower)

        const NFTName = Background + " " + Mint + " " + Flower
        metadataArray.push(NFTName)
        // const { "721" } = metaObj

    }

    return (
        <Row>
            <Col>
                <Swiper
                    // slidesPerView={"auto"}
                    slidesPerView={activeArt}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    // modules={[Pagination]}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    // navigation={true}
                    slideToClickedSlide={true}

                    grabCursor={true}
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    className="mySwiper"
                    style={{
                        // zIndex: 800 
                        width: '100vw',
                        overflow: 'hidden'
                    }}
                    observer='true'
                    observeParents='true'
                >

                    {imagesArray.map((index) => {

                        return <SwiperSlide
                            key={index}
                            style={{
                                paddingTop: 10,
                                paddingBottom: 60,
                            }}
                        >
                            <Card
                                className='artSwiperCard'
                                hoverable
                                style={{
                                    // width: '100%',
                                    // width: '50px',
                                    // width: artSize,
                                    borderRadius: 20,
                                    backgroundSize: 'cover',
                                    objectFit: 'cover',
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src={require(`./images/${index}.png`)}
                                        className=''
                                        style={{
                                            // height: "15rem",

                                            // height: artSize,
                                            // backgroundSize: 'cover',
                                            objectFit: 'cover',

                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                        }}
                                    />
                                }
                                actions={[
                                ]}
                            >

                                {/* <br /> */}
                                <div> <b>Lucky Mints #{index}</b></div>
                                <div > {metadataArray[index - 1]}</div>
                                {/* <div className='buyArtButton' style={{ overflow: 'hidden' }}> policy: {NFT.policy}</div> */}

                            </Card>
                            {/* <div>
                                <img src={image} alt="" />
                            </div> */}


                        </SwiperSlide>
                    })}
                </Swiper>
            </Col>
        </Row>
    )
}

export default CollectionSlider