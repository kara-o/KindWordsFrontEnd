import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'

class Read extends Component {
  render() {
    const { letter, handleClick, isWrite, icon } = this.props

    return (
      <div className='ui centered card'>
        <div className='content'>
          <p>{letter.content}</p>
          <span className='right floated icon'>
            <Icon icon={icon} />
          </span>
        </div>
        {isWrite ? null : (
          <Button onClick={handleClick} className='ui button'>
            Respond to Letter
          </Button>
        )}
      </div>
    )
  }
}

export default Read
