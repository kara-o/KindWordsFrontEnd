import React, { Component } from 'react'
import Button from './Button'
import fairyImg from '../assets/images/glow.png'
import anime from 'animejs'

class Fairy extends Component {
  componentDidMount() {
    this.animate()
  }

  animate = () => {
    const { throwFairy, start } = this.props

    let randomX = () => Math.floor(Math.random() * 50) + 5
    let randomY = () => Math.floor(Math.random() * 500) + 5
    let randomXMovement = () => {
      return anime.random(-`${randomX()}`, `${randomX()}`) + 'rem'
    }

    let bottomY = {
      translateY: [
        { value: randomY() * -1 },
        { value: randomY() * -1 },
        { value: randomY() * 1 },
        { value: randomY() * -1 },
      ],
    }

    let topY = {
      translateY: [
        { value: randomY() },
        { value: randomY() },
        { value: randomY() * -1 },
        { value: randomY() },
      ],
    }

    const baseAnime = {
      targets: '.star',
      translateX: [
        { value: randomXMovement() },
        { value: randomXMovement() },
        { value: randomXMovement() },
        { value: randomXMovement() },
      ],
      opacity: [{ value: 1 }, { value: 0 }],
      easing: 'easeOutSine',
      duration: 15000,
      complete: throwFairy,
    }

    const updatedAnime = Object.assign(
      {},
      baseAnime,
      start === 'bottom' ? bottomY : topY
    )
    anime(updatedAnime)
  }

  render() {
    const { handleClick, fairy, start } = this.props
    // const random = Math.floor(Math.random() * 1000)
    // const random2 = Math.floor(Math.random() * 1000)
    // const fairyStyle = {
    //   top: random + 'px !important',
    //   left: random2 + 'px !important',
    // }
    return (
      <Button
        className={`star ui button ${start}`}
        onClick={e => handleClick(e, fairy)}
        // style={fairyStyle}
      >
        <img id='glowImg' src={fairyImg} alt='glowing light' />
      </Button>
    )
  }
}

export default Fairy
