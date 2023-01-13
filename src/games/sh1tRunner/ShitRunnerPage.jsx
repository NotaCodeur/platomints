import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Statistic, Input, Button, Card, Collapse, Carousel, List, Slider, Radio, Cascader, Popover } from 'antd';

import ground from './imgs/ground.png'
import dinoStationary from './imgs/dino-stationary.png'
import './styles.css'
// import './script.js'
import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateCloud, setupCloud, getCloudRects } from "./cloud.js"
import { updateRock, setupRock, } from "./rock.js"
import { updateFlower, setupFlower } from "./flower.js"
import NFTSwiperSection from '../../components/sections/NFTSwiperSection';
import TokenSwiperSection from '../../components/sections/TokenSwiperSection';
import CharacterSwiper from './CharacterSwiper';
import HeaderSection from '../../components/Header';



const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

let worldElem = ''
// const worldElem = document.querySelector("[data-world]")
let scoreElem = ''
// const scoreElem = document.querySelector("[data-score]")
let startScreenElem = ''
// const startScreenElem = document.querySelector("[data-start-screen]")

// setPixelToWorldScale()
// window.addEventListener("resize", setPixelToWorldScale)
// document.addEventListener("keydown", handleStart, { once: true })




let lastTime
let speedScale
let score
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateCloud(delta, speedScale)
    updateRock(delta, speedScale)
    updateFlower(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino(document.querySelector(".dino"))
    setupCactus()
    setupCloud()
    setupRock()
    setupFlower()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
    }, 100)
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
    console.log('worldElem', worldElem)
    // worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    // worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

const ShitRunnerPage = ({ state, dispatch, stateTwo, dispatchTwo }) => {

    const [ selectedCharacter, setSelectedCharacter ] = useState('https://s4.gifyu.com/images/dino-prototype3.gif')


    useEffect(() => {
        worldElem = document.querySelector(".world")
        scoreElem = document.querySelector(".score")
        startScreenElem = document.querySelector(".start-screen")

        setPixelToWorldScale()
        window.addEventListener("resize", setPixelToWorldScale)
        document.addEventListener("keydown", handleStart, { once: true })


        return () => {
            // document.removeEventListener("keydown")
            handleLose()
        }
    }, [])

    const [ groundImage, setGroundImage] = useState('https://i.postimg.cc/fWKvYMct/ground02.png')
    // const [ groundImage, setGroundImage] = useState('https://s4.gifyu.com/images/ground3.png')
    useEffect(() => {

    }, [])

    return (
        <div>
            <HeaderSection state={state} dispatch={dispatch} stateTwo={stateTwo} dispatchTwo={dispatchTwo} />


            <div className='shitBody'>
                {/* <script src="./script.js" type="module"></script> */}
                {/* ShitRunnerPage */}

                <div class="world" data-world onClick={() => handleStart()}>
                    <div class="score" data-score>0</div>
                    <div class="start-screen" data-start-screen>Press Any Key To Start</div>
                    <img src={groundImage} class="ground" alt='ground' data-ground />
                    <img src={groundImage} class="ground" alt='ground' data-ground />
                    <img src={selectedCharacter} class="dino" alt='dino' data-dino />
                </div>

            </div>

            <br />
            <br />
            <br />
            <br />
            <Row justify='center' align='center'>
                <h3 className='siteTitle' style={{ marginLeft: 0 }}>👇 </h3>
                <h3 className='siteText' style={{ marginLeft: 10, fontSize: 32 }}>Select  </h3>
                <h3 className='siteText' style={{ marginLeft: 10, fontSize: 32 }}>your </h3>
                <h3 className='siteTitle' style={{ marginLeft: 10 }}>Character</h3>
            </Row >
            <CharacterSwiper state={state} dispatch={dispatch} stateTwo={stateTwo} dispatchTwo={dispatchTwo} setSelectedCharacter={setSelectedCharacter} />
            {/* <TokenSwiperSection state={state} dispatch={dispatch} stateTwo={stateTwo} dispatchTwo={dispatchTwo} /> */}
        </div>
    )
}

export default ShitRunnerPage