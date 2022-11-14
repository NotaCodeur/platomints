import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  let groundElems = document.querySelectorAll(".ground")
  // const groundElems = document.querySelectorAll("[data-ground]")
  
  export function setupGround() {
    groundElems = document.querySelectorAll(".ground")
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 200)
  }
  
  export function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
      incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)
  
      if (getCustomProperty(ground, "--left") <= -200) {
        incrementCustomProperty(ground, "--left", 400)
      }
    })
  }