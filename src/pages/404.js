import { useEffect } from 'react'
import '../css/404.css'

function NotFoundPage() {
    useEffect(() => {
        const jumpButton = document.getElementById("jumping-box")
        const jumpingBox = document.getElementById("jumping-box")
        const jumpman = document.getElementById("jumping-mario")
        const questionBlock = document.getElementById("question-block")
        const coinSound = document.getElementById("coin")
    
        let jumpingBoxPosition = 0
        let jumpDirection = 12
    
        let jumpAnimation
        let isJumping = false
    
        const makeTheJump = () => {
          setTimeout(() => window.open("/"), 2000)
    
          if (isJumping) return
          jumpAnimation = setInterval(jump, 50)
        }
    
        const jump = () => {
          isJumping = true
          jumpman.style.left = "-50px"
    
          if (jumpingBoxPosition >= 30) {
            jumpman.style.left = "-100px"
          }
    
          if (jumpDirection === 3) {
            questionBlock.style.top = "-2px"
            coinSound.play()
          }
    
          if (jumpDirection === -3) {
            questionBlock.style.top = "7px"
          }
    
          if (jumpingBoxPosition === 0 && jumpDirection < 0) {
            clearInterval(jumpAnimation)
            jumpDirection = 12
            jumpman.style.left = "0px"
            isJumping = false
          }
    
          jumpingBox.style.bottom = jumpingBoxPosition + "px"
          jumpDirection -= 1
          jumpingBoxPosition += jumpDirection
        };
    
        if (jumpButton) {
          jumpButton.addEventListener('click', makeTheJump)
        }
    
        return () => {
          if (jumpButton) {
            jumpButton.removeEventListener('click', makeTheJump)
          }
          clearInterval(jumpAnimation)
        }
      }, [])
  return (
    <div className="container not-found-page">
      <h2>404 - nicht gefunden</h2>
      <div id="jumping-mario-animation">
            <div id="jumping-box">
                <img id="jumping-mario" src="images/jumpman.png"></img>
            </div>
            <img id="question-block" src="images/questionblock.png"></img>
        </div>
        <audio src="sounds/coin.mp3" id="coin"></audio>
    </div>
  )
}

export default NotFoundPage
