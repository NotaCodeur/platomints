import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const FLOWER_INTERVAL_MIN = 1000
  const FLOWER_INTERVAL_MAX = 4000

  const FLOWER_TOP_MIN = -20
  const FLOWER_TOP_MAX = 20

  let worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupFlower() {
    nextCactusTime = FLOWER_INTERVAL_MIN
    document.querySelectorAll("[data-flower]").forEach(flower => {
        flower.remove()
    })
  }
  
  export function updateFlower(delta, speedScale) {
    document.querySelectorAll("[data-flower]").forEach(flower => {
      incrementCustomProperty(flower, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(flower, "--left") <= -100) {
        flower.remove()
      }
    })
  
    if (nextCactusTime <= 0) {
      createFlower()
      nextCactusTime =
        randomNumberBetween(FLOWER_INTERVAL_MIN, FLOWER_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
  }
  
//   export function getCloudRects() {
//     return [...document.querySelectorAll("[data-rock]")].map(cactus => {
//       return cactus.getBoundingClientRect()
//     })
//   }
  
  function createFlower() {
    worldElem = document.querySelector("[data-world]")

    const flower = document.createElement("img")
    flower.dataset.rock = true
    flower.src = "https://i.postimg.cc/Y0Px9GCm/flower01.png"
    // cactus.src = "https://i.postimg.cc/8cBc8jgm/cactus.png"
    // rock.style.height = "20%"
    const randomNumber = randomNumberBetween(FLOWER_TOP_MIN, FLOWER_TOP_MAX) 
    flower.style.bottom = randomNumber+'px'
    
    if (randomNumber >= 0) {
        flower.style.zIndex = -10
    }
    if (randomNumber <= 0) {
        flower.style.zIndex = 10
    }

    // cactus.src = "imgs/cactus.png"
    flower.classList.add("flower")
    setCustomProperty(flower, "--left", randomNumberBetween(100, 200))
    worldElem.append(flower)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }