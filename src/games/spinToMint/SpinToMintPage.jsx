import { Col, Modal, Row, Slider } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import SpinToMintPageStyles from './SpinToMintPage.module.css'
import SpinSound from "../../sounds/SpinSound2.mp3"
import Lose from "../../sounds/Lose.wav"
import winCoin from "../../sounds/winCoin.mp3"
import { useRef } from 'react'
import allMintImages from "./images/allMintImages"
import CollectionSlider from './CollectionSlider'

const SpinToMintPage = ({ state, dispatch, stateTwo, dispatchTwo }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const gameStates = ["Welcome", "Spinning", "Win", "Lose"]
    const [gameState, setGameState] = useState('Welcome')
    const [spinning, setSpinning] = useState('notSpinning')
    const [gameScore, setGameScore] = useState(100)

    const [spinnerStates, setSpinnerStates] = useState([5, 2, 13])
    const [spinState1, setSpinState1] = useState(0)
    const [spinState2, setSpinState2] = useState(1)
    const [spinState3, setSpinState3] = useState(2)


    const fruits = ["🍇", "🍉", "🍌", "🍍", "🍑", "🍒", "🍓", "🍋", "🍎", "🥝"]
    // const fruits = ["🍅", "🍇", "🍈", "🍉", "🍊", "🍌", "🍍", "🍑", "🍒", "🍓", "🍋", "🍐", "🍎", "🥝"]


    // const [volume, setVolume] = useState(50)
    const [currentSoundSrc, setCurrentSoundSrc] = useState('')

    const audioPlayer = useRef()
    function playSound(sound) {
        // new Audio(sound).play()
        audioPlayer.current.src = sound;
        audioPlayer.current.play()
    }

    // Audio Slider
    const [inputValue, setInputValue] = useState(50);
    useEffect(() => {
        if (audioPlayer) {
            // audioPlayer.current.volume = inputValue / 10;

        }

    }, [inputValue])

    const onChange = (newValue) => {
        setInputValue(newValue);
    };




    // when click "SPIN"
    // gameState changes to spinning
    // when gameState = spinning => 
    // Spinner spins for X amount of seconds and stops on random item from array []

    useEffect(() => {
        console.log(gameState)
        if (spinning === "Spinning") {
            playSound(SpinSound)
            setGameState("Spinning")
            Spin()
            Spin2()
            Spin3()
        }
        if (spinning === "notSpinning") {
            spinRounds = 0
            spinRounds2 = 0
            spinRounds3 = 0
        }


    }, [spinning])


    let spinRounds = 0
    function Spin() {
        setTimeout(() => {
            if (spinning === 'Spinning') {
                // setSpinnerStates([randomNumber(0, fruits.length), randomNumber(0, fruits.length), randomNumber(0, fruits.length)])
                setSpinState1(randomNumber(0, fruits.length))
                // setSpinState2(randomNumber(0, fruits.length))
                // setSpinState3(randomNumber(0, fruits.length))
                spinRounds++
            }

            if (spinRounds < 10) {
                Spin()
            }

            if (spinRounds >= 10) {
                console.log("spinRounds", spinRounds)
                // setGameState('Welcome')
                // spinRounds = 0
            }
        }, 100);
    }

    let spinRounds2 = 0
    function Spin2() {
        setTimeout(() => {
            if (spinning === 'Spinning') {
                setSpinState2(randomNumber(0, fruits.length))
                spinRounds2++
            }

            if (spinRounds2 < 20) {
                Spin2()
            }

            if (spinRounds2 >= 20) {
                console.log("spinRounds2", spinRounds2)
                // setGameState('Welcome')
                // spinRounds = 0
            }
        }, 100);
    }

    let spinRounds3 = 0
    function Spin3() {
        setTimeout(() => {
            if (spinning === 'Spinning') {
                setSpinState3(randomNumber(0, fruits.length))
                spinRounds3++
            }

            if (spinRounds3 < 30) {
                Spin3()
            }

            if (spinRounds3 >= 30) {
                console.log("spinRounds3", spinRounds3)
                setSpinning("notSpinning")


                // spinRounds = 0
            }
        }, 100);
    }


    useEffect(() => {
        if (gameState !== 'Welcome') {

            if (spinning === "notSpinning") {

                console.log("spinstates", spinState1, spinState2, spinState3)
                if (spinState1 === spinState2 && spinState1 === spinState3) {
                    playSound(winCoin)
                    setGameState('🥳 Jackpot! 🎊')
                    setGameScore((prev) => prev + 200)
                }
                else if (spinState2 === spinState1 || spinState2 === spinState3) {
                    playSound(winCoin)
                    setGameState('You Win ! 🎉')
                    setGameScore((prev) => prev + 40)
                }
                else if (spinState1 === spinState2 || spinState1 === spinState3) {
                    playSound(winCoin)
                    setGameState('You Win ! 🥇')
                    setGameScore((prev) => prev + 40)
                }
                else {
                    playSound(Lose)
                    setGameState('You lose')
                    setGameScore((prev) => prev - 10)
                }
            }
        }

    }, [spinning])



    // we also need a mintModal, when user exchanges coins to mint a NFT 
    // a modal pops up with a mint address and a pay button



    // Function to generate random number 
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }




    const OpenSaturnPayment = (policyId) => {

        // Popup width and height
        const popupWidth = 500;
        const popupHeight = 700;

        // Open popup in center of screen
        const top = window.top.outerHeight / 2 + window.top.screenY - popupHeight / 2;
        const left = window.top.outerWidth / 2 + window.top.screenX - popupWidth / 2;

        // Open the Saturn Payment Gateway popup
        const url = "https://saturnnft.io/mint/" + policyId;
        const popup = window.open(
            url,
            "Saturn Payment Gateway",
            `popup=1, location=1, width=${popupWidth}, height=${popupHeight}, top=${top}, left=${left}`,
        );
        return popup
    };

    return (

        <Row justify='center' align='middle' style={{ height: '100%', backgroundColor: 'darkslateblue' }}>
            {/* <!-- The Modal --> */}
            <Col xs={22} sm={22} md={20} lg={14} xl={12} style={{ height: '100%', paddingTop: '150px'}}>
                <audio src={currentSoundSrc} ref={audioPlayer} />

                <Row justify='center'>
                    {/* GAMESTATE: Welcome / Spinning / you win / you lose */}
                    <Col span={24} style={{ textAlign: 'center', padding: '10px', fontSize: 24 }}>
                        <h2 style={{ color: "gold" }}>{gameState === "Spinning" ? "🎲 Spinning 🎰" : gameState}</h2>
                    </Col>
                </Row>
                <Row justify='center' style={{ textAlign: 'center', padding: '10px', fontSize: 24 }}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <h3 style={{ color: "khaki" }}>coins: {gameScore}</h3>
                    </Col>
                </Row>
                <Row justify='space-between' gutter={0} style={{ border: "3px blue solid", borderRadius: '20px', backgroundColor: 'white' }}>
                    <Col span={8} style={{ fontSize: 40, padding: '5px', textAlign: 'center' }}>
                        {/* {fruits[spinnerStates[0]]} */}
                        {fruits[spinState1]}
                    </Col>
                    <Col span={8} style={{ fontSize: 40, padding: '5px', textAlign: 'center' }}>
                        {/* {fruits[spinnerStates[1]]} */}
                        {fruits[spinState2]}
                    </Col>
                    <Col span={8} style={{ fontSize: 40, padding: '5px', textAlign: 'center' }}>
                        {/* {fruits[spinnerStates[2]]} */}
                        {fruits[spinState3]}
                    </Col>
                </Row>

                <br />
                <br />
                <br />
                <br />
                <Row justify='center' >
                    <Col span={24} >
                        <div className={SpinToMintPageStyles.spinButton} style={{ width: '100%', borderRadius: '20px', backgroundColor: 'mediumspringgreen', textAlign: 'center', padding: '10px', fontSize: 24 }} onClick={() => {
                            // setSpinnerStates([randomNumber(0, fruits.length), randomNumber(0, fruits.length), randomNumber(0, fruits.length)])
                            // alert(fruits.length)
                            setSpinning("Spinning")
                        }}>
                            <p style={{ color: "darkslateblue" }}>spin now!</p>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />

                {/* <Row>
                    <Col span={24} >
                        <Slider
                            min={0}
                            max={10}
                            onChange={onChange}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                            trackStyle={{ backgroundColor: "#FF4500", height: "10px" }}
                            railStyle={{ position: "relative", top: "7px" }}
                            handleStyle={{ border: "2px solid #FF4500", height: "20px", width: "20px" }}
                        />
                    </Col>
                </Row>
                <br />
                <br /> */}
                <Row justify='center'>
                    <Col>
                        <p style={{ color: "khaki" }}> {gameScore} / 200 coins to mint</p>
                    </Col>
                    <Col span={24} >

                        {gameScore < 200 ?

                            <div className={SpinToMintPageStyles.mintButtonDisabled} id="myBtn" disabled={gameScore < 200 ? true : false} style={{ width: '100%', borderRadius: '20px', backgroundColor: 'mediumturquoise', textAlign: 'center', padding: '10px', fontSize: 24 }}>
                                <p style={{ color: "darkslateblue" }}>win {200 - gameScore} coins to mint!</p>
                            </div>
                            :
                            <div className={SpinToMintPageStyles.mintButtonEnabled} id="myBtn" onClick={() => { showModal(); setGameScore((prev) => prev - 200) }} disabled={gameScore < 200 ? true : false} style={{ width: '100%', borderRadius: '20px', backgroundColor: 'mediumturquoise', textAlign: 'center', padding: '10px', fontSize: 24 }}>
                                <p style={{ color: "darkslateblue" }}>mint now for 200 coins!</p>
                            </div>
                        }
                        <Modal title="Congratulations mighty hero, you win a mint!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                            footer={null}
                        >
                            <Row justify='center'>
                                <Col span={24}>
                                    <p style={{ textAlign: 'center' }}>I hope you had fun playing Spin to Mint</p>
                                    <br />
                                </Col>
                                <Col span={24}>
                                    <p style={{ textAlign: 'center' }}>For your valuable 200 coins you are rewarded: </p>
                                </Col>
                                <Col span={24}>
                                    <p style={{ textAlign: 'center' }}>- 1 mint🍀 of the first Spin to Mint "Lucky Mints" CNFT collection </p>
                                    <br />
                                </Col>
                                <Col span={24}>
                                    <p style={{ textAlign: 'center' }}>Mint info: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Art: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>Generative</b> </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Style: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>Pixelart, 2D</b> </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Collection size: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>33 unique pieces</b> </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Policy ID: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>3ead821f090e9ec17cb623080a699b0314c995d661c03282f4330e54</b> </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Royalty %: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>5</b> </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}>Price: </p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'center' }}> <b>10 ADA</b> </p>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <br />
                                    <br />
                                    <img
                                        src="https://saturn-production.nyc3.digitaloceanspaces.com/Payment/Buttons/SaturnPayment100.png"
                                        alt=''
                                        onClick={() => OpenSaturnPayment('59482db5-1743-4d88-8e46-911af53d21e8')}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Col>
                            </Row>
                        </Modal>
                    </Col>
                </Row>

                <br />
                <br />

                <p style={{ textAlign: 'center', color: "khaki" }}>
                    Explore Spin To Mint NFT Collection #01
                </p>



                {/* <Row justify='center' gutter={[20, 20]}>
                    <Col span={4} style={{ border: "3px blue solid", borderRadius: '20px', backgroundColor: 'white', height: '100px' }}>
                    
                    </Col>
                    <Col span={4} style={{ border: "3px blue solid", borderRadius: '20px', backgroundColor: 'white', height: '100px' }}>

                    </Col>
                    <Col span={4} style={{ border: "3px blue solid", borderRadius: '20px', backgroundColor: 'white', height: '100px' }}>

                    </Col>
                    <Col span={4} style={{ border: "3px blue solid", borderRadius: '20px', backgroundColor: 'white', height: '100px' }}>
                    
                    </Col>
                </Row> */}

            </Col >
            <Col span={24} style={{ height: '100%', paddingBottom: '150px' }} >
                <CollectionSlider images={allMintImages} />

            </Col>

        </Row >
    )
}

export default SpinToMintPage