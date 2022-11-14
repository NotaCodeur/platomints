import { Carousel, Row, Col, Card, Typography, Button, Space } from 'antd';
import React, { useState, useEffect, Component, useMemo, useCallback, useReducer, useRef } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';

// Import Swiper styles

import 'swiper/css/bundle';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
// import required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// import NFTCard from '../Cards/NFTCard';
import FunctionSetNFTs from '../../functions/FunctionSetNFTs';
import CharacterCard from './CharacterCard';

// import Wireframe1 from '../images/Wireframe1.png'
// import Wireframe2 from '../images/Wireframe2.png'
// import Wireframe3 from '../images/Wireframe3.png'
// import Art01 from '../images/Art01.jpg'
// import Art02 from '../images/Art02.jpg'
// import Art03 from '../images/Art03.jpg'

// import ArtBlur01 from '../images/ArtBlur01.jpg'
// import ArtBlur02 from '../images/ArtBlur02.jpg'
// import ArtBlur03 from '../images/ArtBlur03.jpg'

// import ElsaIG01 from '../images/ElsaIG01Small.jpg'
// import ElsaIG02 from '../images/ElsaIG02Small.jpg'
// import ElsaIG03 from '../images/ElsaIG03Small.jpg'


const { Title, Text } = Typography;

const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const { Meta } = Card;


const CharacterSwiper = ({ state, dispatch, stateTwo, dispatchTwo, setSelectedCharacter }) => {


    const [activeArt, setActiveArt] = useState(1);
    const [sectionHeight, setSectionHeight] = useState('120vh');
    const [artSize, setArtSize] = useState('20vw');
    const [screenSize, setScreenSize] = useState(null);
    const [art2Size, setArt2Size] = useState('20vw')

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (screenSize < 480) {
            setActiveArt(2);
            setArtSize('80vw');
            setArt2Size('80vw')
        } else if (screenSize < 900) {
            setActiveArt(2);
            setArtSize('60vw');
            setArt2Size('30vw')
        } else if (screenSize < 1200) {
            setActiveArt(4);
            setArtSize('40vw');
        } else if (screenSize < 1500) {
            setActiveArt(5);
            setArtSize('20vw');
        } else if (screenSize > 1500) {
            setActiveArt(7);
            setArtSize('20vw');
        }
    }, [screenSize]);


    useEffect(() => {
        if (screenSize > 1200) {
            setSectionHeight('120vh');
        } else if (screenSize > 575) {
            setSectionHeight('150vh');
        } else if (screenSize > 200) {
            setSectionHeight('200vh');
        }
    }, [screenSize]);


    const NFTs = useRef();

    useEffect(() => {
        if (NFTs !== state.refs.NFTs) {
            dispatch({ type: 'setRefs', payload: { ...state.refs, 'NFTs': NFTs } })
        }
    }, [state])

    const images = [
        {
            original: 'https://api.ipfsbrowser.com/ipfs/get.php?hash=QmcjXMNoANgXJx6Z8yKHnCJiNa1uGCFqRqnuQ8xdZfx4gf',
            //   original: ArtBlur01,
            name: "Wireframe01",
            buyLink: "https://pay.nmkr.io/?p=e2ed3be50e5c4a71af5e4afebe433830&n=b43c38be93c845c7b22986ceadc5fad8",
            id: 1
        },
        {
            original: 'https://api.ipfsbrowser.com/ipfs/get.php?hash=QmcjXMNoANgXJx6Z8yKHnCJiNa1uGCFqRqnuQ8xdZfx4gf',
            //   original: ArtBlur02,
            name: "Wireframe02",
            buyLink: "https://pay.nmkr.io/?p=e2ed3be50e5c4a71af5e4afebe433830&n=17ae8093c869492cae18298bfe1bbfca",
            id: 2
        },
        {
            original: 'https://api.ipfsbrowser.com/ipfs/get.php?hash=QmcjXMNoANgXJx6Z8yKHnCJiNa1uGCFqRqnuQ8xdZfx4gf',
            //   original: ArtBlur03,
            name: "Wireframe03",
            buyLink: "https://pay.nmkr.io/?p=e2ed3be50e5c4a71af5e4afebe433830&n=b0e9f4c89707473f9e55ae84aa738bf3",
            id: 3
        }
    ];



    const scrollToSection = (elementRef) => {
        // console.log('elementRef', elementRef)
        if (elementRef?.current) {

            window.scrollTo({
                top: elementRef.current.offsetTop,
                behavior: "smooth",
            })
        }
    }


    // useEffect((dispatchTwo) => {
    //     // when we have array of nfts
    //     // for each nft get the CNFT info
    //     // if undefined do nothing
    //     // if info
    //     // set dispactch collectibles

    //     stateTwo?.userNFTArray?.forEach((NFT) => {
    //         console.log('forEach userNFT Array');
    //         // FunctionSetNFTs({NFT, dispatchTwo});
    //         // <FunctionSetNFTs NFT={NFT} dispatchTwo={dispatchTwo} />
    //         // dispatchTwo({ type: 'setUserCollectiblesArray', payload: NFT })
    //     })

    // }, [stateTwo.userNFTArray])

    // const [nftArray, setNftArray] = useState([]);

    // useEffect(() => {
    //     console.log('nftArray is changing', nftArray)
    // }, [nftArray])

    const [selectedCard, setSelectedCard] = useState(0)

    useEffect(() => {
        console.log('slelected Card', selectedCard)
        //   console.log('stateTwo.userCollectiblesArray[selectedCard]', stateTwo?.userCollectiblesArray[selectedCard])
        console.log('stateTwo.userCollectiblesArray[selectedCard]', 'https://api.ipfsbrowser.com/ipfs/get.php?hash=' + stateTwo?.userCollectiblesArray[selectedCard]?.asset?.last_metadata?.image?.split('//')[1])


        if (stateTwo?.userCollectiblesArray[selectedCard]?.asset?.last_metadata?.image?.includes('ipfs')) {

            setSelectedCharacter('https://api.ipfsbrowser.com/ipfs/get.php?hash=' + stateTwo?.userCollectiblesArray[selectedCard]?.asset?.last_metadata?.image?.split('//')[1])
        }
        else {

            setSelectedCharacter(obj.asset?.last_metadata?.image)
        }


    }, [selectedCard])


    const obj = {
        amount: "1",
        asset: { last_metadata: { image: "https://s4.gifyu.com/images/dino-prototype3.gif" } },
        name: "sh1trunner",
        policy: "129d5472636cf6ac966854efa577c6bf4e86982a69107402fb0ebaae",
        policyAndName: "129d5472636cf6ac966854efa577c6bf4e86982a69107402fb0ebaae686f6c6f676966",
    }

    return (
        <>
            <div ref={NFTs} className='artSection' style={{ width: '100%', }}>
                <div className='artSectionSubDiv' style={{ height: '100%' }}>

                    <Row justify='center'>
                        <Col
                            // span={24}
                            style={{
                                width: '100%'
                            }}
                        >
                            {<p style={{ textAlign: 'center' }}>{selectedCard.toString()}</p>}

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
                                navigation={true}
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
                            // maxBackfaceHiddenSlides={10}
                            >
                                <SwiperSlide
                                    key={-1}
                                    style={{
                                        paddingLeft: 0,
                                        paddingTop: 60,
                                        paddingBottom: 100,
                                        // width: '50px',
                                        // width: artSize,
                                        // zIndex: 999 
                                    }}>
                                    <CharacterCard NFT={obj} artSize={artSize} dispatchTwo={dispatchTwo} index={-1} selectedCard={selectedCard} setSelectedCard={setSelectedCard}
                                    // nftArray={nftArray} setNftArray={setNftArray}
                                    />
                                    {/* <Card
                                                    className='artSwiperCard'
                                                    hoverable
                                                    style={{
                                                        width: artSize,
                                                        borderRadius: 40,
                                                        backgroundSize: 'cover',
                                                        objectFit: 'cover',
                                                    }}
                                                    cover={<img alt="example" src={image.original} className='artSectionImg' style={{
                                                        height: artSize,
                                                        // backgroundSize: 'cover',
                                                        // objectFit: 'cover',

                                                        borderTopLeftRadius: 40,
                                                        borderTopRightRadius: 40,
                                                    }} />}
                                                    actions={[
                                                    ]}
                                                >

                                                    <br />
                                                    <div className='buyArtButton'> Buy NFT! </div>

                                                </Card> */}
                                </SwiperSlide>
                                {stateTwo?.userCollectiblesArray?.map((NFT, index) => (


                                    <SwiperSlide
                                        key={index}
                                        style={{
                                            paddingLeft: 0,
                                            paddingTop: 60,
                                            paddingBottom: 100,
                                            // width: '50px',
                                            // width: artSize,
                                            // zIndex: 999 
                                        }}>
                                        <CharacterCard NFT={NFT} artSize={artSize} dispatchTwo={dispatchTwo} index={index} selectedCard={selectedCard} setSelectedCard={setSelectedCard}
                                        // nftArray={nftArray} setNftArray={setNftArray}
                                        />
                                        {/* <Card
                                                    className='artSwiperCard'
                                                    hoverable
                                                    style={{
                                                        width: artSize,
                                                        borderRadius: 40,
                                                        backgroundSize: 'cover',
                                                        objectFit: 'cover',
                                                    }}
                                                    cover={<img alt="example" src={image.original} className='artSectionImg' style={{
                                                        height: artSize,
                                                        // backgroundSize: 'cover',
                                                        // objectFit: 'cover',

                                                        borderTopLeftRadius: 40,
                                                        borderTopRightRadius: 40,
                                                    }} />}
                                                    actions={[
                                                    ]}
                                                >

                                                    <br />
                                                    <div className='buyArtButton'> Buy NFT! </div>

                                                </Card> */}
                                    </SwiperSlide>
                                ))}



                            </Swiper>
                            <br />
                            <br />

                        </Col>
                    </Row>

                    {/* 
                    <Row justify='center' style={{ paddingTop: '100px', paddingBottom: '150px', height: '100%' }}>
                        <Col xs={22} sm={22} md={22} lg={22} xl={20}>
                            <h2 className='artSectionTitle'>Art Gallery</h2>
                            <h2 className='introSectionText'>NFT Sneak preview</h2>
                            <Row gutter={[50, 50]} justify='center' style={{ paddingBottom: '50px' }}>

                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>

                                    <div
                                        className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example"
                                            // src={ElsaIG01} 
                                            className='artSectionImgIG' style={{
                                                // height: art2Size,
                                                backgroundSize: 'cover',
                                                // objectFit: 'cover',
                                                width: '100%',
                                                borderRadius: 40,

                                                // borderTopLeftRadius: 40,
                                                // borderTopRightRadius: 40,
                                            }} />
                                    </div>


                                    <br />
                                    <br />


                                    <div
                                        className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example" src={images[0].original} className='artSectionImg' style={{
                                            // height: art2Size,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                            width: '100%',
                                            borderRadius: 40,

                                            // borderTopLeftRadius: 40,
                                            // borderTopRightRadius: 40,
                                        }} />
                                    </div>

                                </Col>

                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>

                                    <div
                                        className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example"
                                            // src={ElsaIG02}
                                            className='artSectionImgIG' style={{
                                                // height: art2Size,
                                                backgroundSize: 'cover',
                                                // objectFit: 'cover',
                                                width: '100%',
                                                borderRadius: 40,

                                                // borderTopLeftRadius: 40,
                                                // borderTopRightRadius: 40,
                                            }} />
                                    </div>

                                    <br />
                                    <br />


                                    <div
                                        className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example" src={images[1].original} className='artSectionImg' style={{
                                            // height: art2Size,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                            width: '100%',
                                            borderRadius: 40,

                                            // borderTopLeftRadius: 40,
                                            // borderTopRightRadius: 40,
                                        }} />
                                    </div>


                                </Col>

                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>

                                    <div className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example"
                                            //  src={ElsaIG03} 
                                            className='artSectionImgIG' style={{
                                                // height: art2Size,
                                                backgroundSize: 'cover',
                                                // objectFit: 'cover',
                                                width: '100%',
                                                borderRadius: 40,

                                                // borderTopLeftRadius: 40,
                                                // borderTopRightRadius: 40,
                                            }} />
                                    </div>

                                    <br />
                                    <br />


                                    <div className='artImgDiv'
                                        // hoverable
                                        style={{
                                            // width: artSize,
                                            // width: '100%',
                                            // height: '100%',
                                            // borderRadius: 40,
                                            // backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                        }}>

                                        <img alt="example" src={images[2].original} className='artSectionImg' style={{
                                            // height: art2Size,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',
                                            width: '100%',
                                            borderRadius: 40,

                                            // borderTopLeftRadius: 40,
                                            // borderTopRightRadius: 40,
                                        }} />
                                    </div>


                                </Col>

                            </Row>









                            <Row gutter={[50, 50]} justify='center' style={{ paddingBottom: '50px' }}>

                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                  <div className='artImgDiv' hoverable
                    style={{
                      // width: artSize,
                      width: '100%',
                      height: '100%',
                      // borderRadius: 40,
                      // backgroundSize: 'cover',
                      // objectFit: 'cover',
                    }}>

                    <img alt="example" src={images[0].original} className='artSectionImg' style={{
                      // height: art2Size,
                      backgroundSize: 'cover',
                      // objectFit: 'cover',
                      width: '100%',
                      borderRadius: 40,

                      // borderTopLeftRadius: 40,
                      // borderTopRightRadius: 40,
                    }} />
                  </div>
                </Col>

                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                  <div className='artImgDiv' hoverable
                    style={{
                      // width: artSize,
                      width: '100%',
                      height: '100%',
                      // borderRadius: 40,
                      // backgroundSize: 'cover',
                      // objectFit: 'cover',
                    }}>

                    <img alt="example" src={images[1].original} className='artSectionImg' style={{
                      // height: art2Size,
                      backgroundSize: 'cover',
                      // objectFit: 'cover',
                      width: '100%',
                      borderRadius: 40,

                      // borderTopLeftRadius: 40,
                      // borderTopRightRadius: 40,
                    }} />
                  </div>
                </Col>

                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                  <div className='artImgDiv' hoverable
                    style={{
                      // width: artSize,
                      width: '100%',
                      height: '100%',
                      // borderRadius: 40,
                      // backgroundSize: 'cover',
                      // objectFit: 'cover',
                    }}>

                    <img alt="example" src={images[2].original} className='artSectionImg' style={{
                      // height: art2Size,
                      backgroundSize: 'cover',
                      // objectFit: 'cover',
                      width: '100%',
                      borderRadius: 40,

                      // borderTopLeftRadius: 40,
                      // borderTopRightRadius: 40,
                    }} />
                  </div>
                </Col>

              </Row>








                            <div className='buyNFTButton' onClick={() => scrollToSection(state.refs.formSection)}> Mint soon </div>



                            <Row gutter={[50, 50]} justify='center'>
                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                                    <Card
                                        className='artSwiperCard'
                                        hoverable
                                        style={{
                                            // width: artSize,
                                            borderRadius: 40,
                                            backgroundSize: 'cover',
                                            objectFit: 'cover',
                                        }}
                                        cover={<img alt="example" src={images[0].original} className='artSectionImg' style={{
                                            // height: art2Size,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',

                                            borderTopLeftRadius: 40,
                                            borderTopRightRadius: 40,
                                        }} />}
                                        actions={[
                                        ]}
                                    >

                                        <br />
                                        <div className='buyArtButton'> Buy NFT! </div>

                                    </Card>
                                </Col>
                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                                    <Card
                                        className='artSwiperCard'
                                        hoverable
                                        style={{
                                            // width: artSize,
                                            borderRadius: 40,
                                            backgroundSize: 'cover',
                                            objectFit: 'cover',
                                        }}
                                        cover={<img alt="example" src={images[1].original} className='artSectionImg' style={{
                                            // height: artSize,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',

                                            borderTopLeftRadius: 40,
                                            borderTopRightRadius: 40,
                                        }} />}
                                        actions={[
                                        ]}
                                    >

                                        <br />
                                        <div className='buyArtButton'> Buy NFT! </div>

                                    </Card>
                                </Col>
                                <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                                    <Card
                                        className='artSwiperCard'
                                        hoverable
                                        style={{
                                            // width: artSize,
                                            borderRadius: 40,
                                            backgroundSize: 'cover',
                                            objectFit: 'cover',
                                        }}
                                        cover={<img alt="example" src={images[2].original} className='artSectionImg' style={{
                                            // height: artSize,
                                            backgroundSize: 'cover',
                                            // objectFit: 'cover',

                                            borderTopLeftRadius: 40,
                                            borderTopRightRadius: 40,
                                        }} />}
                                        actions={[
                                        ]}
                                    >

                                        <br />
                                        <div className='buyArtButton'> Buy NFT! </div>

                                    </Card>
                                </Col>
                            </Row>














                        </Col>
                    </Row > */}
                </div>
            </div>
        </>
    )
}

export default CharacterSwiper