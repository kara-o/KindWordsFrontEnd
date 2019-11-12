import React, { Component } from 'react'
import Button from './Button'

class Icon extends Component {
  state = {
    currentIcon: this.props.icon,
    isChange: false
  }

  handleClick = () => {
    this.setState({
      isChange: !this.state.isChange
    })
  }

  setCurrentIcon = e => {
    console.log(e.target.value)
    this.setState({
      currentIcon: e.target.value,
      isChange: false
    })
  }

  renderGroup = () => {
    return (
      <div className='ui buttons'>
        <button className='ui button' onClick={this.setCurrentIcon} value='❤'>
          {'❤'}
        </button>
        <button className='ui button' onClick={this.setCurrentIcon} value='❀'>
          {'❀'}
        </button>
        <button className='ui button' onClick={this.setCurrentIcon} value='☼'>
          {'☼'}
        </button>
        <button className='ui button' onClick={this.setCurrentIcon} value='☺'>
          {'☺'}
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Button className='circular ui icon button' onClick={this.handleClick}>
          <span role='img'>{this.state.currentIcon}</span>
        </Button>
        {this.state.isChange ? this.renderGroup() : null}
      </>
    )
  }
}

export default Icon
