import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Input, Space, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import {
  useGetHeliumHotspotsQuery,

} from '../services/heliumApi';


import mintImage from '../images/mintImage.png';
import platoImage from '../images/plato.png';
import holoman from '../images/holoman.gif';

const { Paragraph } = Typography;
const { Title } = Typography;
const { Panel } = Collapse;

// account data model
const Homepage = () => {


  const { data, isFetching } = useGetCryptosQuery(10);

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
          <div class="centerer"></div>
          <img src={mintImage} alt="" />
        </div>
        <div className='siteTitleDiv'>
          <h1 className='siteTitle'> Platomints.com</h1>
        </div>
      </Row>
      <br />
      <Col>
        <Row className='placeholder'>
          <Col xs={1} sm={1} md={6} lg={6} xl={6} >
            <div>
              <img className='platoImage' src={platoImage} alt="plato" />
            </div>
          </Col>


          <Col xs={22} sm={22} md={12} lg={12} xl={12} align='center'>
            <br />
            <br />
            <h2 >Play a game </h2>
            <h2 >To win a Cardano NFT mint</h2>
            <br />
            <br />
            <br />
            <br />
            <h2 >Latest Play to Mints</h2>
            <br />




            {/* Play To Mint containter */}
            {/*| image    ||  | title & description |     | mint info |  | */}
            {/*            |                      button                 | */}
            <div className='PTMDiv'>
              <Row gutter={[40, 40]}>

                {/* image */}
                <Col span={8}>
                  <img className='PTMImg' src={holoman} alt='holoman'></img>
                </Col>

                <div style={{ width: "20px" }} />
                {/* title desc   +    wen mint    +   max supply */}
                <Col span={14}>
                  <Row>
                    <Col span={10}>
                      {/* title and description */}
                      <p className='PTMTitle'> <b>Holoman</b></p>
                      <p className='PTMDescription'>defeat holoman 10 times in Rock Paper Scissors to win a <b>free mint</b></p>

                    </Col>
                    <Col span={7}>
                      {/* image */}
                      {/* mint info */}
                      <text className='PTMMintInfo'></text>
                      <p className='PTMTitle'> mint : </p>
                      <p className='PTMTitle'> <b>6.5AD</b></p>
                      <br />
                      <p className='PTMDescription'>wen start :</p>
                      <p className='PTMDescription'><b>13-08-22</b></p>
                      <p className='PTMDescription'>wen end :</p>
                      <p className='PTMDescription'><b>13-09-22</b></p>

                    </Col>
                    <Col span={7}>
                      {/* image */}
                      {/* mint info */}
                      <text className='PTMMintInfo'></text>
                      <p className='PTMTitle'> max supply : </p>
                      <p className='PTMTitle'> <b>1000</b></p>
                      <br />
                      <p className='PTMDescription'>already minted</p>
                      <p className='PTMDescription'><b>420</b></p>


                    </Col>
                  </Row>

                  {/* play button */}
                  <a className='PTMPlayButton' href="https://holoman.netlify.app" target="_blank">play </a>
                  {/* <button className='PTMPlayButton' onClick={function()=>{}}> play</button> */}

                </Col>
              </Row>
            </div>
            <div className='PTMDiv'>
              <Row gutter={[40, 40]}>

                {/* image */}
                <Col span={8}>
                  <img className='PTMImg' src={holoman} alt='holoman'></img>
                </Col>

                <div style={{ width: "20px" }} />
                {/* title desc   +    wen mint    +   max supply */}
                <Col span={14}>
                  <Row>
                    <Col span={10}>
                      {/* title and description */}
                      <p className='PTMTitle'> <b>Holoman</b></p>
                      <p className='PTMDescription'>defeat holoman 10 times in Rock Paper Scissors to win a <b>free mint</b></p>

                    </Col>
                    <Col span={7}>
                      {/* image */}
                      {/* mint info */}
                      <text className='PTMMintInfo'></text>
                      <p className='PTMTitle'> mint : </p>
                      <p className='PTMTitle'> <b>6.5AD</b></p>
                      <br />
                      <p className='PTMDescription'>wen start :</p>
                      <p className='PTMDescription'><b>13-08-22</b></p>
                      <p className='PTMDescription'>wen end :</p>
                      <p className='PTMDescription'><b>13-09-22</b></p>

                    </Col>
                    <Col span={7}>
                      {/* image */}
                      {/* mint info */}
                      <text className='PTMMintInfo'></text>
                      <p className='PTMTitle'> max supply : </p>
                      <p className='PTMTitle'> <b>1000</b></p>
                      <br />
                      <p className='PTMDescription'>already minted</p>
                      <p className='PTMDescription'><b>420</b></p>


                    </Col>
                  </Row>

                  {/* play button */}
                  <a className='PTMPlayButton' href="https://holoman.netlify.app" target="_blank">play </a>
                  {/* <button className='PTMPlayButton' onClick={function()=>{}}> play</button> */}

                </Col>
              </Row>
            </div>

            



          </Col>
          <Col xs={1} sm={1} md={6} lg={6} xl={6}></Col>
        </Row>
        
      </Col>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </>
  )
}

export default Homepage