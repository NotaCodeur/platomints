import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Statistic, Input, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader } from 'antd';
import { Space } from 'antd';

import { useGetCNFTAssetQuery } from '../services/CNFTApi';

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
const FunctionSetNFTs = ({ NFT, artSize, dispatchTwo }) => {
    console.log('NFT', NFT)

    const [nftPic, setNftPic] = useState('')


    const [skip1, setSkip1] = useState(true);
    const [policyAndName, setPolicyAndName] = useState('');
    const { data: CNFTAsset } = useGetCNFTAssetQuery(policyAndName, { skip: skip1 });


    useEffect(() => {
        console.log('CNFT.policyAndName', NFT.policyAndName)

        // setPolicyAndName(NFT.policyAndName)
    }, [NFT])



    useEffect(() => {
        if (skip1) {
            setSkip1(false)
        }

    }, [])

    useEffect((NFT) => {
        console.log('CNFTAsset', CNFTAsset)
        console.log('CNFTAsset', CNFTAsset?.last_metadata?.image?.split('//')[1])
        // if (!skip1) {
        //     setSkip1(true)
        // }
        if (CNFTAsset === undefined) {
            setPolicyAndName(NFT.policyAndName)

            console.log('Error in getting cnftasset')
            console.log('CNFTAsset', CNFTAsset)

        }
        else {
            // dispatchTwo({ type: 'setUserCollectiblesArray', payload: { ...NFT, asset: CNFTAsset } })
        }

    }, [CNFTAsset])

    

   return (
    null
   )
};

export default FunctionSetNFTs;