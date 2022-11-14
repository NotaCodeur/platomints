import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Col, Row, Card, Button, Input, List, Divider, Space, Dropdown, Anchor } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons/lib/icons';
// import WireframeLogoTransparent from '../images/WireframeLogoTransparent.png'
// import Roadmap from './Roadmap';
import { Link } from 'react-router-dom';
import '../App.css'
// import App from '../App';
import mintImage from '../images/mintImage.png';


const { Header, Content, Footer } = Layout;

const HeaderSection = ({ state, dispatch, stateTwo, dispatchTwo }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);


    useEffect(() => {
        // dispatch({ type: 'reload', payload: true });


    }, [])



    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (screenSize > 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);



    // useEffect to make the wallet menu ?





    const menu = (
        <Menu
            style={{ marginTop: 10, marginRight: 0, borderRadius: 10 }}

            items={[
                {
                    label: <a href={() => scrollToSection(state.refs.hero)}>Top</a>,
                    key: '0',
                },
                {
                    label: <a href={() => scrollToSection(state.refs.roadmap)}>Roadmap</a>,
                    key: '1',
                },
                {
                    label: <a href={() => scrollToSection(state.refs.art)}>Art</a>,
                    key: '2',
                },
                {
                    label: <a href={() => scrollToSection(state.refs.team)}>Team</a>,
                    key: '3',
                },
                {
                    label: <a href={() => scrollToSection(state.refs.faq)}>Faq</a>,
                    key: '4 ',
                },
                {
                    type: 'divider',
                },
                {
                    label: <a href="/app" target="_blank" >App</a>,
                    key: '6 ',
                },
            ]}
        />
    );

    const menu2 = (
        <Menu
            style={{ marginTop: 10, marginRight: 0, borderRadius: 10 }}
            items={[
                {
                    label: <a  >Nami</a>,
                    key: '0',
                },
                {
                    label: <a >Eternl</a>,
                    key: '1',
                },
                {
                    label: <a >Flint</a>,
                    key: '2',
                },

            ]}
        />
    );

    const menuNoWallet = (
        <Menu
            className='selectWalletMenu'
            align='center'
            style={{
                marginTop: 10,
                marginRight: 0,
                borderRadius: 10,
                // background: 'rgba(255, 255, 255, 0.09)',
                background: 'rgba(255, 255, 255, 0.189)',
                /* border-radius: 16px; */
                // boxShadow: 0 4px 30px rgba(0, 0, 0, 0.1),
                // backdropFilter: `blur(6px)`,
                // webkitBackdropFilter: `blur(6px)`,
                // border: 1px solid rgba(255, 255, 255, 0.64)
            }}
            items={[
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://namiwallet.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Nami</a>,
                    key: '0',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://flint-wallet.com/"
                        target="_blank"
                        rel="noreferrer"
                    >Flint</a>,
                    key: '1',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://eternl.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Eternl</a>,
                    key: '2',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://gerowallet.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Gero</a>,
                    key: '3',
                }
            ]}
        />
    );





    // this is used to generate the menu for the wallet connection button on the top of the page
    // if there is no wallet found 
    // => show a menu to install wallets
    // if there is a wallet found
    // => show a menu to connect a wallet 
    const walletMenu = () => {
        console.log('wallet menu')
        let items = []


        if (stateTwo.wallets.length === 0) {
            console.log('wallet menu stateTwo.wallets.length === -1:', stateTwo.wallets.length)
            items = [
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://namiwallet.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Nami</a>,
                    key: '0',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://flint-wallet.com/"
                        target="_blank"
                        rel="noreferrer"
                    >Flint</a>,
                    key: '1',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://eternl.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Eternl</a>,
                    key: '2',
                },
                {
                    label: <a
                        className='connectWalletMenuItem'
                        href="https://gerowallet.io/"
                        target="_blank"
                        rel="noreferrer"
                    >Gero</a>,
                    key: '3',
                }
            ]
        }

        else if (stateTwo.wallets.length === 1) {
            console.log('wallet menu stateTwo.wallets.length=== 1 :', stateTwo.wallets.length)
            stateTwo?.wallets?.forEach((wallet, index) => items.push(
                {
                    label: <p
                        className='connectWalletMenuItem'
                        onClick={(e) => {
                            dispatchTwo({ type: 'setwhichWalletSelected', payload: wallet })
                        }} >{wallet}</p>,
                    key: index,
                }
            ))
        }

        else if (stateTwo.wallets.length >= 1) {
            console.log('wallet menu stateTwo.wallets.length >= 1:', stateTwo.wallets.length)
            // stateTwo?.wallets?.forEach((wallet, index) => items.push(
            //     {
            //         label: <p
            //             className='connectWalletMenuItem'
            //             style={{ borderRadius: 10 }}
            //             onClick={(e) => {

            //                 if (stateTwo.whichWalletSelected === wallet) {
            //                     console.log('stateTwo.whichWalletSelected === wallet')
            //                     dispatch({ type: 'reload', payload: true });
            //                 } else {
            //                     // dispatchTwo({ type: 'setwhichWalletSelected', payload: wallet });
            //                 }
            //             }} >{wallet}</p>,
            //         key: index,
            //     }

            // ))

            stateTwo?.wallets?.forEach((wallet, index) => {
                if (stateTwo.whichWalletSelected === wallet) {
                    items.push({
                        label: <p
                            className='connectWalletMenuItem'
                            onClick={(e) => {
                                console.log('stateTwo.whichWalletSelected === wallet')
                                dispatch({ type: 'reload', payload: true });
                            }}
                        >{wallet}</p>,
                        key: index
                    })
                }

                else if (wallet !== stateTwo?.whichWalletSelected) {
                    items.push({
                        label: <p
                            className='connectWalletMenuItem'
                            onClick={(e) => {
                                console.log('wallet !== stateTwo?.whichWalletSelected')
                                dispatchTwo({ type: 'setwhichWalletSelected', payload: wallet });
                            }}
                        >{wallet}</p>,
                        key: index
                    })
                }
            })


        }

        else {
            console.log('wallet menu else idunno what happend:', stateTwo.wallets.length)
        }



        // console.log('wallet menu stateTwo :', stateTwo)
        // console.log('wallet menu stateTwo.wallets.length :', stateTwo.wallets.length)
        // console.log('wallet menu items :', items)
        return (
            <Menu
                className='selectWalletMenu'
                align='center'
                style={{
                    marginTop: 10,
                    marginRight: 0,
                    borderRadius: 10,
                    // background: 'rgba(255, 255, 255, 0.09)',
                    background: 'rgba(255, 255, 255, 0.189)',
                    /* border-radius: 16px; */
                    // boxShadow: 0 4px 30px rgba(0, 0, 0, 0.1),
                    // backdropFilter: `blur(6px)`,
                    // webkitBackdropFilter: `blur(6px)`,
                    // border: 1px solid rgba(255, 255, 255, 0.64)
                }}
                items={items}
            />
        )
    }


    function WalletsMenu({ stateTwo }) {

        let items = []

        stateTwo?.wallets?.forEach((wallet, index) => {
            if (stateTwo.whichWalletSelected === wallet) {
                items.push({
                    label: <p
                        className='connectWalletMenuItem'
                        onClick={(e) => {
                            console.log('stateTwo.whichWalletSelected === wallet')
                            dispatch({ type: 'reload', payload: true });
                        }}
                    >{wallet}</p>,
                    key: index
                })
            }

            else if (wallet !== stateTwo?.whichWalletSelected) {
                console.log('wallet', items)
                items.push({
                    label: <p
                        className='connectWalletMenuItem'
                        onClick={(e) => {
                            console.log('wallet !== stateTwo?.whichWalletSelected')
                            dispatchTwo({ type: 'setwhichWalletSelected', payload: wallet });
                        }}
                    >{wallet}</p>,
                    key: index
                })
            }
        })

        const menuu = (<Menu
            className='selectWalletMenu'
            align='center'
            style={{
                marginTop: 10,
                marginRight: 0,
                borderRadius: 10,
                // background: 'rgba(255, 255, 255, 0.09)',
                background: 'rgba(255, 255, 255, 0.189)',
                /* border-radius: 16px; */
                // boxShadow: 0 4px 30px rgba(0, 0, 0, 0.1),
                // backdropFilter: `blur(6px)`,
                // webkitBackdropFilter: `blur(6px)`,
                // border: 1px solid rgba(255, 255, 255, 0.64)
            }}
            items={items}

        />)

        return (
            <Dropdown overlay={menuu} placement="bottomRight">
                <div className='connectWalletButton' style={{}}>

                    <Space >
                        <p className='connectWalletButtonText' style={{ marginBottom: '0px' }}>
                            Wallet
                        </p>
                        <DownOutlined />
                    </Space>
                </div>
            </Dropdown>

        )
    }


    function WalletsMenuIcon({ stateTwo }) {

        let items = []

        stateTwo?.wallets?.forEach((wallet, index) => {
            if (stateTwo.whichWalletSelected === wallet) {
                items.push({
                    label: <p
                        className='connectWalletMenuItem'
                        onClick={(e) => {
                            console.log('stateTwo.whichWalletSelected === wallet')
                            dispatch({ type: 'reload', payload: true });
                        }}
                    >{wallet}</p>,
                    key: index
                })
            }

            else if (wallet !== stateTwo?.whichWalletSelected) {
                items.push({
                    label: <p
                        className='connectWalletMenuItem'
                        onClick={(e) => {
                            console.log('wallet !== stateTwo?.whichWalletSelected')
                            dispatchTwo({ type: 'setwhichWalletSelected', payload: wallet });
                        }}
                    >{wallet}</p>,
                    key: index
                })
            }
        })

        const menuu = (<Menu
            className='selectWalletMenu'
            align='center'
            style={{
                marginTop: 10,
                marginRight: 0,
                borderRadius: 10,
                // background: 'rgba(255, 255, 255, 0.09)',
                background: 'rgba(255, 255, 255, 0.189)',
                /* border-radius: 16px; */
                // boxShadow: 0 4px 30px rgba(0, 0, 0, 0.1),
                // backdropFilter: `blur(6px)`,
                // webkitBackdropFilter: `blur(6px)`,
                // border: 1px solid rgba(255, 255, 255, 0.64)
            }}
            items={items}

        />)

        return (
            <Dropdown overlay={menuu} placement="bottomRight">
                <div className='connectWalletButton' style={{}}>

                    <Space >
                        <img className='walletIcon' src={stateTwo?.walletIcon} alt="Walletlogo" />
                        {/* <img className='walletIcon' src={window?.cardano[stateTwo?.whichWalletSelected].icon} alt="Walletlogo" /> */}
                        <DownOutlined />

                    </Space>
                </div>
            </Dropdown>

        )
    }


    const scrollToSection = (elementRef) => {
        // console.log('elementRef', elementRef)
        if (elementRef?.current) {

            window.scrollTo({
                top: elementRef.current.offsetTop,
                behavior: "smooth",
            })
        }
    }


    return (

        <>
            <div className='headerDiv'
                style={{
                    margin: '20px',
                    borderRadius: '40px'
                    // maxHeight: '0px'
                }}
            >
                <Row justify="center"  align='middle' style={{
                    // maxHeight: '15vh', 
                    paddingTop: '10px',
                    paddingBottom: '10px'
                }}>
                    <Col xs={22} sm={22} md={22} lg={20} xl={20}>
                        <Row justify="space-between" align="middle">
                            <Col >
                                <Link to='/'>
                                    {/* <h2 className='headerLogoText'></h2> */}
                                    <div className='img-container'>
                                        {/* <div class="centerer"></div> */}
                                        <img src={mintImage} alt="" />
                                    </div>
                                    <h1 className='siteTitle'> Platomint.io</h1>
                                    {/* <img src={WireframeLogoTransparent} className="logo" alt="logo" /> */}
                                </Link>
                            </Col>

                            <Col >
                                <div style={{
                                    height: '100%',
                                    // alignContent: 'middle'
                                }}>

                                    <Row align='middle' justify='space-around' >

                                        {/* <Col
                                            // style={{ width: '100%' }}
                                            style={{ height: '100%', alignContent: 'middle' }}
                                        >
                                            <Link to='/app' style={{ height: '100%', alignContent: 'middle' }}>
                                                <div className='connectWalletButton' target="_blank" >
                                                    <div className='connectWalletButtonText' >
                                                        App
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col> */}

                                        <Col>
                                            {

                                                stateTwo?.Utxos !== undefined && stateTwo.Utxos !== null ?

                                                    <WalletsMenuIcon stateTwo={stateTwo} />
                                                    // <Dropdown overlay={walletMenu} placement="bottomRight">

                                                    //     {/* <Button style={{ marginRight: 20, borderRadius: 20 }}> */}
                                                    //     <div className='connectWalletButton' style={{}}>

                                                    //         <Space >
                                                    //             <img className='walletIcon' src={window.cardano[stateTwo?.whichWalletSelected].icon} alt="Walletlogo" />
                                                    //             <DownOutlined />

                                                    //         </Space>
                                                    //     </div>
                                                    //     {/* </Button> */}
                                                    // </Dropdown>

                                                    :
                                                    stateTwo?.wallets?.length === 0 ?
                                                        <Dropdown overlay={menuNoWallet} placement="bottomRight">
                                                            <div className='connectWalletButton' style={{}}>

                                                                <Space >
                                                                    <p className='connectWalletButtonText' style={{ marginBottom: '0px' }}>
                                                                        Wallet
                                                                    </p>
                                                                    <DownOutlined />
                                                                </Space>
                                                            </div>
                                                        </Dropdown>
                                                        : stateTwo?.wallets?.length === 1 ?
                                                            <div className='connectWalletButton' style={{}}>

                                                                <Space >
                                                                    <p className='connectWalletButtonText'
                                                                        onClick={(e) => {
                                                                            console.log('stateTwo.whichWalletSelected === wallet')
                                                                            dispatch({ type: 'reload', payload: true });
                                                                        }}
                                                                    >
                                                                        Wallet
                                                                    </p>
                                                                    {/* <DownOutlined /> */}
                                                                </Space>
                                                            </div>

                                                            : stateTwo?.wallets?.length >= 1 ?
                                                                <WalletsMenu stateTwo={stateTwo} />
                                                                // <Dropdown overlay={walletMenu} placement="bottomRight">
                                                                //     <div className='connectWalletButton' style={{}}>

                                                                //         <Space >
                                                                //             <p className='connectWalletButtonText'>
                                                                //                 Wallet
                                                                //             </p>
                                                                //             <DownOutlined />
                                                                //         </Space>
                                                                //     </div>
                                                                // </Dropdown>
                                                                : null


                                            }
                                        </Col>

                                        {/* <Dropdown overlay={menu} placement="bottomRight">
                                            <a onClick={(e) => { e.preventDefault() }}>
                                                <Space>
                                                    Menu
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown> */}
                                    </Row>

                                    {/*                                    
                                   
                                   
                                    {activeMenu ? (

                                        <Row align='middle' justify='space-around' >
                                            {

                                                stateTwo.networkId !== undefined ?
                                                    <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                        <Space >
                                                            <img className='walletIcon' src={window.cardano[stateTwo?.whichWalletSelected].icon} alt="Walletlogo" />
                                                        </Space>
                                                    </Button>

                                                    :
                                                    stateTwo?.wallets?.length === 0 ?
                                                        <Dropdown overlay={walletMenu} placement="bottomRight">
                                                            <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                                <Space >
                                                                    Install a wallet
                                                                    <DownOutlined />
                                                                </Space>
                                                            </Button>
                                                        </Dropdown>
                                                        : stateTwo?.wallets?.length === 1 ?
                                                            <Button style={{ marginRight: 20, borderRadius: 20 }} onClick={() => { dispatch({ type: 'reload', payload: true }); }}>
                                                                <Space >
                                                                    Connect
                                                                </Space>

                                                            </Button>

                                                            : stateTwo?.wallets?.length >= 1 ?
                                                                <Dropdown overlay={walletMenu} placement="bottomRight">
                                                                    <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                                        <Space >
                                                                            Connect wallet
                                                                            <DownOutlined />
                                                                        </Space>
                                                                    </Button>
                                                                </Dropdown>
                                                                : null


                                            }
                                            <Dropdown overlay={menu} placement="bottomRight">
                                                <a onClick={(e) => { e.preventDefault() }}>
                                                    <Space>
                                                        Menu
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </Row>

                                    )
                                        : activeMenu === false ? (
                                            <Row align='middle' justify='space-around' >
                                                {

                                                    stateTwo.networkId !== undefined ?
                                                        <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                            <Space >
                                                                <img className='walletIcon' src={window.cardano[stateTwo?.whichWalletSelected].icon} alt="Walletlogo" />
                                                            </Space>
                                                        </Button>

                                                        :
                                                        stateTwo?.wallets?.length === 0 ?
                                                            <Dropdown overlay={walletMenu} placement="bottomRight">
                                                                <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                                    <Space >
                                                                        Install a wallet
                                                                        <DownOutlined />
                                                                    </Space>
                                                                </Button>
                                                            </Dropdown>
                                                            : stateTwo?.wallets?.length === 1 ?
                                                                <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                                    <Space >
                                                                        Connect
                                                                    </Space>

                                                                </Button>

                                                                : stateTwo?.wallets?.length >= 1 ?
                                                                    <Dropdown overlay={walletMenu} placement="bottomRight">
                                                                        <Button style={{ marginRight: 20, borderRadius: 20 }}>
                                                                            <Space >
                                                                                Connect wallet
                                                                                <DownOutlined />
                                                                            </Space>
                                                                        </Button>
                                                                    </Dropdown>
                                                                    : null


                                                }
                                                <Dropdown overlay={menu} placement="bottomRight">
                                                    <a onClick={(e) => { e.preventDefault() }}>
                                                        <Space>
                                                            Menu
                                                            <DownOutlined />
                                                        </Space>
                                                    </a>
                                                </Dropdown>
                                            </Row>

                                        ) : null
                                    } */}
                                </div>
                            </Col>

                        </Row>
                    </Col>
                    {/* <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                        <Row justify="end" >
                            <Col>

                            </Col>

                        </Row>

                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}></Col> */}
                </Row>


            </div>
        </>
    )
}

export default HeaderSection