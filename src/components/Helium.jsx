import React, { useState, useEffect, Component } from 'react';
import { Col, Row, Typography, Card, Button, List, Grid, Divider, Space, Input } from 'antd';
import { Line, Chart  } from 'react-chartjs-2';

import { useGetHeliumSupplyQuery, useGetHeliumHotspotsQuery, useGetHeliumHotspotsRewardsAllTimeQuery } from '../services/heliumApi';

const { Text, Title } = Typography;



const Helium = () => {
  const [myAdress, setMyAddress] = useState('');
  const [hotspotAddress, setHotspotAddress] = useState("");
  const [myHotspotData, setMyHotspotData] = useState([]);
  const { data } = useGetHeliumSupplyQuery();
  const { data: myHotspots, refetch } = useGetHeliumHotspotsQuery(myAdress);
  const { data: rewards } = useGetHeliumHotspotsRewardsAllTimeQuery(hotspotAddress);
  const style = { background: '#ffffff', borderRadius: "40px", padding: '8px', overflow: "hidden", elevation: '10',  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }; 
  const [hotspots, setHotspots] = useState([]); 

  useEffect(() => {
    const filterMyHotspots = myHotspots?.data;
    setMyHotspotData(filterMyHotspots);
  }, [myHotspots]);

  useEffect(() => {
    
    const data = localStorage.getItem('Account');
    if (data) {
      setAccountObj( JSON.parse(data) );
    }
  
  },[])


  const [ accountObj, setAccountObj ] = useState({
    AccountAddress: '',
    hotspots: [],
    transactions: {
      allTransaction: [{}],
      ownerTransaction: [{}],
      payeeTransactions: [{}],
    },});
  const addWalletToAccObj = (title) => {
    const array = accountObj;
    array.AccountAddress = title;
    setAccountObj(array)
    console.log('wallet address set')}
    
  const addHotspotsToAccObj = (arrayHotpots) => {
    const array = accountObj;
    array.hotspots = arrayHotpots;
    setAccountObj(array);
  }

  const addHotspotsToHotspots = () => {
    const array = myHotspots.data;
    setHotspots(array);
  }

  
  const addAccObjToLocalStorage = (accountObj) => {
    const object = accountObj;
    localStorage.setItem('Account', JSON.stringify(object));
  }

  const forEveryHotspotAddSomething = (accountObj) => {
    for ( let i=0; i<accountObj.hotspots.length; i++) 
    {
      let obj = accountObj.hotspots[i];
      const array = accountObj.hotspots;
      if (obj.hostAddress == null) {
        obj = {...obj, hostAddress: '', hostShare: 0, rewardsYear: [], rewardsMonth: [], rewardsWeek: []}; }
      array[i]=obj; 
      setHotspots(array);
      addHotspotsToAccObj(array);
      console.log(accountObj)
    }
  }
    
  

  const onSubmitYourWalletClick = (e) => {
    addWalletToAccObj(myAdress)
    console.log('wallet addedd to acc obj', myAdress)

    
    addHotspotsToHotspots();
    addHotspotsToAccObj([...hotspots]);
    console.log(accountObj);
    refetch()
    for (let i = 0; i < accountObj.hotspots.length; i ++) {
      let obj = accountObj;
      let hotObj = accountObj.hotspots[i];
      hotObj = {...hotObj, hostAddress: hostAddressButton, hostShare: 0, rewardsYear: [], rewardsMonth: [], rewardsWeek: []}
      obj.hotspots[i] =hotObj;
      setAccountObj(obj)
    }
    // forEveryHotspotAddSomething(accountObj);
    
    addAccObjToLocalStorage(accountObj);
  }

 
  const onButtonClick = (e) => {
  }
  
  const [ hostAddressButton, setHostAddressButton ] = useState('');
  const changeHostAddress = ( hotspot,  hostAddressString) => {
    let array = [];
    let array2 = [];
    let index = accountObj.hotspots.indexOf(hotspot);
    console.log({index})
    setHotspotAddress(hotspot.address)
    
    array = accountObj; 
    array2 = array.hotspots[index];
    array2.hostAddress = hostAddressButton;
    array.hotspots[index] = array2;
    
    setAccountObj( array);
    console.log(accountObj);
  }
  
  const [hostShareButton, setHostShareButton] = useState(0);
  const changeHostShare = (hotspot) => {
    let array = [];
    let array2 = [];
    let index = accountObj.hotspots.indexOf(hotspot);
    console.log({index});
    array = accountObj;
    array2 = array.hostShare = hostAddressButton;
    array.hotspots[index] = array2;

    setAccountObj(array);
    console.log(accountObj);

  }
  
  
  return (
    <>
     
     
    </>
  )   
  
}
export default Helium
