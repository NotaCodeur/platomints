import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Statistic, Input, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader } from 'antd';
import { Space } from 'antd';

import { useGetCNFTAssetQuery } from '../../services/CNFTApi';

const { Paragraph } = Typography;
const { Title } = Typography;
const { Panel } = Collapse;
const { Text, Link } = Typography;

// const gameObj = {
//     "img":"",
//     "title":"",
//     "creator":"",
//     "description":"",
//     "mintPrice":0,
//     "wenStart":"",
//     "wenEnd":"",
//     "maxSupply":1,
//     "gameLink":"",

// }
// in: img, title, creator, description, mintPrice, wenStart, wenEnd, maxSupply, gameLink
const CharacterCard = ({ NFT, artSize, dispatchTwo,
    index, selectedCard, setSelectedCard
    // nftArray, setNftArray
}) => {
    // console.log(gameObj)

    const [nftPic, setNftPic] = useState('')


    const [skip1, setSkip1] = useState(true);
    const [policyAndName, setPolicyAndName] = useState('');
    // const { data: CNFTAsset } = useGetCNFTAssetQuery(policyAndName, { skip: skip1 });


    useEffect(() => {
        console.log('NFT', NFT)

        // setPolicyAndName(NFT.policyAndName)
    }, [NFT])



    // useEffect(() => {
    //     if (skip1) {
    //         setSkip1(false)
    //     }

    // }, [])

    // useEffect(() => {
    //     console.log('CNFTAsset', CNFTAsset)
    //     console.log('CNFTAsset', CNFTAsset?.last_metadata?.image?.split('//')[1])
    //     // if (!skip1) {
    //     //     setSkip1(true)
    //     // }
    //     if (CNFTAsset === undefined) {
    //         // setPolicyAndName(NFT.policyAndName)

    //         console.log('Error in getting cnftasset')
    //         console.log('CNFTAsset', CNFTAsset)

    //     }
    //     else {
    //         console.log('CNFTAsset', CNFTAsset)
    //         // console.log('nftArray', nftArray)
    //         // let array = []
    //         // array = nftArray
    //         // array.push(CNFTAsset)
    //         // setNftArray(prev => prev === array)
    //         // dispatchTwo({ type: 'setUserCollectiblesArray', payload: { ...NFT, asset: CNFTAsset } })
    //     }

    // }, [CNFTAsset])

    const [cardClassName, setCardClassName] = useState('artSwiperCard')

    const [cardActive, setCardActive] = useState(false)




    useEffect(() => {
        if (cardActive === true) {
            setCardClassName('activeArtSwiperCard')
            document.getElementById(`CharCard${index}`).className = 'activeArtSwiperCard'
        }
        else {
            setCardClassName('artSwiperCard')
            document.getElementById(`CharCard${index}`).className = 'artSwiperCard'
        }
    }, [cardActive])

    useEffect(() => {
        if (selectedCard === index) {
            setCardActive(true)
        }
        else {
            setCardActive(false)
        }
    }, [selectedCard])



    function onCardClick() {
        console.log('onCardClick e')
        console.log('index', index)

        if (selectedCard === index) {
        }
        else {
            setSelectedCard(index)
        }


    }
    return (
        <>
            {NFT.asset?.last_metadata?.image?.includes('ipfs') ?
                <Card
                    id={`CharCard${index}`}
                    // className={cardClassName}
                    hoverable
                    style={{
                        // width: '100%',
                        // width: '50px',
                        // width: artSize,
                        borderRadius: 40,
                        backgroundSize: 'cover',
                        objectFit: 'cover',
                    }}
                    cover={<img alt="example" src={'https://api.ipfsbrowser.com/ipfs/get.php?hash=' + NFT.asset?.last_metadata?.image?.split('//')[1]} className='artSectionImg' style={{
                        height: "15rem",

                        // height: artSize,
                        // backgroundSize: 'cover',
                        objectFit: 'cover',

                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }} />}
                    actions={[
                    ]}
                    onClick={(e) => onCardClick()}
                >

                    <br />
                    <div className='buyArtButton'> name: {NFT.name}</div>
                    <div className='buyArtButton'> amount: {NFT.amount}</div>
                    <div className='buyArtButton' style={{ overflow: 'hidden' }}> policy: {NFT.policy}</div>

                </Card>
                :
                <Card
                    id={`CharCard${index}`}
                    // className={cardClassName}
                    hoverable
                    style={{
                        // width: '100%',
                        // width: '50px',
                        // width: artSize,
                        borderRadius: 40,
                        backgroundSize: 'cover',
                        objectFit: 'cover',
                    }}
                    cover={<img alt="example" src={NFT.asset?.last_metadata?.image} className='artSectionImg' style={{
                        height: "15rem",

                        // height: artSize,
                        // backgroundSize: 'cover',
                        objectFit: 'cover',

                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }} />}
                    actions={[
                    ]}
                    onClick={(e) => onCardClick()}
                >

                    <br />
                    <div className='buyArtButton'> name: {NFT.name}</div>
                    <div className='buyArtButton'> total: {NFT.amount}</div>
                    <div className='buyArtButton' style={{ overflow: 'hidden' }}> policy: {NFT.policy}</div>
                    <br />

                    <Row justify='center'>

                    <div className='connectWalletButton'  onClick={() => window.open('https://pay.nmkr.io/?p=bdefd23ad62545fb90e5b57ca5ee6f26&c=1')} target="_blank"> Buy NFT</div>
                    </Row>

                </Card>
            }

            {/* <Card style={{ borderRadius: 40, padding: 0, margin: 0, marginBottom: 40, }}>
                <Row gutter={[40, 40]}>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <img className='PTMImg' src={NFT.img} alt={NFT.title}></img>
                    </Col>

                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                        <Row type='flex'>

                            <Col xs={24} sm={24} md={14} lg={14} xl={110}>
                                <Title level={5}><b>{NFT.title}</b></Title>
                                <Paragraph ellipsis={false}>
                                    by <b>{NFT.creator}</b> <br /><br />
                                    {NFT.description}
                                </Paragraph>
                            </Col>

                            <Col xs={24} sm={24} md={10} lg={10} xl={10} type='flex' align='middle'>
                                <Space direction="vertical" >

                                    <Paragraph ellipsis={false}>
                                        mint: <br /><b>{NFT.mintPrice} ADA</b> <br />wen: <br /><b>{NFT.wenStart}</b><br />wen end: <br /><b>{NFT.wenEnd}</b><br />max supply: <br /> <b>{NFT.maxSupply} </b>
                                    </Paragraph>
                                    <Row justify='space-between' align='end'>
                                        <Col>
                                            {NFT.poolLink && <a href={NFT.poolLink} target="_blank" className='siteText' style={{ marginLeft: 0, fontSize: 28, }}>🔍</a> || null}
                                        </Col>
                                        <Col>
                                            {NFT.poolLink && <a href={NFT.storeLink} target="_blank" className='siteText' style={{ marginLeft: 0, fontSize: 28, }}>💲</a> || null}
                                        </Col>
                                    </Row>
                                    <br />
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} display="flex" flex="auto" style={{ height: "100%" }}>
                                <Row justify="center" align='bottom' flex="auto" display="flex" style={{ width: "100%", height: "100%" }} >
                                    {NFT.gameLink.length > 0 &&
                                        <a className='PTMPlayButton' href={NFT.gameLink} target="_blank"> Play
                                            <p level={5} className='buttonText'>Play</p>
                                        </a>
                                        ||
                                        <a disabled className='PTMPlayButton'  > Soon
                                            <p level={5} className='buttonText'>Play</p>
                                        </a>

                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card> */}
        </>
    )
};

export default CharacterCard;