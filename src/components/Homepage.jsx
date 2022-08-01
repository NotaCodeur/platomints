import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Input, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader, Popover } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Space } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import {
  useGetHeliumHotspotsQuery,

} from '../services/heliumApi';

import PlayToMintCard from './Cards/PlayToMintCard';
import BubblesText from './BubblesText';
import GameData from '../app/GameData';
import PlatoQuotes from '../app/PlatoQuotes';

import mintImage from '../images/mintImage.png';
import platoImage from '../images/plato.png';
import holoman from '../images/holoman.gif';

const { Paragraph } = Typography;
const { Title } = Typography;
const { Panel } = Collapse;
const { Text, Link } = Typography;





const gameObj = {
  "img": require('../images/holoman.gif'),
  "title": 'holoman',
  "creator": 'Nota Codeur',
  "description": 'holoman is a rock paper scissors game',
  "mintPrice": 10,
  "wenStart": "now",
  "wenEnd": "soon",
  "maxSupply": 1,
  "gameLink": "https://holoman.netlify.app",

}


// account data model
const Homepage = () => {


  const { data, isFetching } = useGetCryptosQuery(10);

  const [ellipsis, setEllipsis] = useState(false);
  const [platoQ, setPlatoQ] = useState(0);

  function RandonNumber() {
    return Math.floor(Math.random() * PlatoQuotes.length)
  }

  const platoContent = () => {
    return (
      <Col>
        <p>{PlatoQuotes[platoQ]}</p>
        <p>- Plato</p>
      </Col>
    )
  }

  const cardStyle = { background: '#ffffff', borderRadius: 20, marginBottom: 15, margin: 5, padding: 5, width: '99%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }
  const buttonStyle = { borderRadius: 20, borderColor: '#758bfd' }


  const contentStyle = {
    height: '320px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


  if (isFetching) return 'loading...';



  return (
    <>
      <br />

      <Row className='navDiv' align="middle">
        <div className='img-container'>
          {/* <div class="centerer"></div> */}
          <img src={mintImage} alt="" />
        </div>
          <h1 className='siteTitle'> Platomint</h1>
        {/* <div className='siteTitleDiv'>
        </div> */}
      </Row>
      <br />
      {/* <Col> */}
      <Row className='placeholder'>
        <Col xs={1} sm={1} md={2} lg={5} xl={5} >

          <div>
            <Popover placement="rightTop" content={platoContent} trigger="hover" borderRadius="50">

              <img className='platoImage' src={platoImage} alt="plato" onClick={(prev) => prev === setPlatoQ(RandonNumber())}>

              </img>
              {/* <Button onClick={(prev ) => prev === setPlatoQ( RandonNumber() )}>RB</Button> */}
            </Popover>
              <div>
              </div>
          </div>
        </Col>


        <Col xs={22} sm={22} md={20} lg={14} xl={14} align='center'>
          <br />
          <br />
          <br />
          <br />
          <h2 style={{filter: 'drop-shadow(1px 1px 4px #ffffff)'}}>Play a game </h2>
          <h2 style={{filter: 'drop-shadow(1px 1px 4px #ffffff)'}}>To win a mint</h2>
          <br />
          <br />
          <br />
          <Row justify='center' align='middle'>
            <BubblesText />
            {/* <div className='bubbles'>
            </div> */}
            {/* <h2>Latest Play to Mints</h2> */}

            <img style={{ width: '50px', margin: 20 }} src={mintImage} alt="" />
          </Row>
          <br />

          {GameData.map((game) => <PlayToMintCard gameObj={game}></PlayToMintCard>)}




        </Col>
        <Col xs={1} sm={1} md={2} lg={5} xl={5}></Col>
      </Row>

      {/* </Col> */}
    </>
  )
}

export default Homepage