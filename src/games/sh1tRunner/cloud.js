import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.01
  const SPEED_MIN = 0.05
  const SPEED_MAX = 0.01
  const CACTUS_INTERVAL_MIN = 2000
  const CACTUS_INTERVAL_MAX = 8000

  const CLOUD_TOP_MIN = 150
  const CLOUD_TOP_MAX = 400

  let worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupCloud() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cloud]").forEach(cloud => {
      cloud.remove()
    })
  }
  
  export function updateCloud(delta, speedScale) {
    document.querySelectorAll("[data-cloud]").forEach(cloud => {
      incrementCustomProperty(cloud, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cloud, "--left") <= -100) {
        cloud.remove()
      }
    })
  
    if (nextCactusTime <= 0) {
      createCactus()
      nextCactusTime =
        randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
  }
  
  export function getCloudRects() {
    return [...document.querySelectorAll("[data-cloud]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }
  
  function createCactus() {
    worldElem = document.querySelector("[data-world]")

    const cloud = document.createElement("img")
    cloud.dataset.cloud = true
    cloud.src = "https://i.postimg.cc/TwBzQkcH/cloud.png"
    // cactus.src = "https://i.postimg.cc/8cBc8jgm/cactus.png"
    cloud.style.height = "20%"
    cloud.style.bottom = randomNumberBetween(CLOUD_TOP_MIN, CLOUD_TOP_MAX)+'px'
    // cactus.src = "imgs/cactus.png"
    cloud.classList.add("cloud")
    setCustomProperty(cloud, "--left", randomNumberBetween(100, 200))
    worldElem.append(cloud)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }