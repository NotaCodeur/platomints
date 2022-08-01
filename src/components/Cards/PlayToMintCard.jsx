import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Statistic, Input, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader } from 'antd';
import { Space } from 'antd';

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
const PlayToMintCard = ({ gameObj }) => {
    console.log(gameObj)

    return (
        <Card style={{ borderRadius: 40, padding: 0, margin: 0, marginBottom: 40,  }}>
            <Row gutter={[40, 40]}>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <img className='PTMImg' src={gameObj.img} alt={gameObj.title}></img>
                </Col>

                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <Row type='flex'>

                        <Col xs={24} sm={24} md={14} lg={14} xl={110}>
                            <Title level={5}><b>{gameObj.title}</b></Title>
                            <Paragraph ellipsis={false}>
                                by <b>{gameObj.creator}</b> <br /><br />
                                {gameObj.description}
                            </Paragraph>
                        </Col>

                        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                            <Space direction="vertical">

                                <Paragraph ellipsis={false}>
                                    mint: <br /><b>{gameObj.mintPrice} ADA</b> <br />wen: <br /><b>{gameObj.wenStart}</b><br />max supply: <br /> <b>{gameObj.maxSupply} </b>
                                </Paragraph>
                            </Space>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} display="flex" flex="auto" style={{height: "100%"}}>
                        <Row justify="center" align='bottom' flex="auto" display="flex" style={{width:"100%", height: "100%"}} >
                            {gameObj.gameLink.length > 0 &&  
                            <a  className='PTMPlayButton' href={gameObj.gameLink} target="_blank"> Play
                                {/* <p level={5} className='buttonText'>Play</p> */}
                            </a>
                            || 
                            <a disabled className='PTMPlayButton'  > Soon
                                {/* <p level={5} className='buttonText'>Play</p> */}
                            </a>
                            
                            }
                        </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};

export default PlayToMintCard;