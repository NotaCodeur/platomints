import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const ROCK_INTERVAL_MIN = 1000
  const ROCK_INTERVAL_MAX = 4000

  const ROCK_TOP_MIN = -20
  const ROCK_TOP_MAX = 20

  let worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupRock() {
    nextCactusTime = ROCK_INTERVAL_MIN
    document.querySelectorAll("[data-rock]").forEach(rock => {
        rock.remove()
    })
  }
  
  export function updateRock(delta, speedScale) {
    document.querySelectorAll("[data-rock]").forEach(rock => {
      incrementCustomProperty(rock, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(rock, "--left") <= -100) {
        rock.remove()
      }
    })
  
    if (nextCactusTime <= 0) {
      createRock()
      nextCactusTime =
        randomNumberBetween(ROCK_INTERVAL_MIN, ROCK_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
  }
  
//   export function getCloudRects() {
//     return [...document.querySelectorAll("[data-rock]")].map(cactus => {
//       return cactus.getBoundingClientRect()
//     })
//   }
  
  function createRock() {
    worldElem = document.querySelector("[data-world]")

    const rock = document.createElement("img")
    rock.dataset.rock = true
    rock.src = "https://i.postimg.cc/ZR91CjsH/rock01.png"
    // cactus.src = "https://i.postimg.cc/8cBc8jgm/cactus.png"
    // rock.style.height = "20%"
    const randomNumber = randomNumberBetween(ROCK_TOP_MIN, ROCK_TOP_MAX) 
    rock.style.bottom = randomNumber+'px'
    
    if (randomNumber >= 0) {
        rock.style.zIndex = -10
    }
    if (randomNumber <= 0) {
        rock.style.zIndex = 10
    }

    // cactus.src = "imgs/cactus.png"
    rock.classList.add("rock")
    setCustomProperty(rock, "--left", randomNumberBetween(100, 200))
    worldElem.append(rock)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }