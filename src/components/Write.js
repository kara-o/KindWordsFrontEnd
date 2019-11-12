import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'

const LETTERS_URL = 'http://localhost:3000/letters'

class Write extends Component {
  state = {
    content: ''
  }

  handleTextChange = e => {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmitLetter = () => {
    const { setDesk, accountId, icon } = this.props
    fetch(LETTERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        content: this.state.content,
        account_id: accountId,
        icon: icon
      })
    })

    setDesk()
  }

  handleSubmitResponse = () => {
    const { letter, setDesk, accountId, icon, incrementResponses } = this.props
    const letterId = letter.id

    fetch(LETTERS_URL + `/${letterId}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        content: this.state.content,
        letter_id: letterId,
        account_id: accountId,
        icon: icon
      })
    })
      .then(res => res.json())
      .then(incrementResponses(letter))

    setDesk()
  }

  render() {
    const { isRead, icon, setDesk } = this.props

    return (
      <>
        <div className='eight wide centered column'>
          <div className='ui fluid card'>
            <div className='content'>
              <div className='ui form'>
                <div className='field'>
                  <textarea
                    rows='10'
                    maxLength='200'
                    onChange={this.handleTextChange}
                    placeholder={
                      isRead
                        ? 'Write your response here! ✎'
                        : 'Write your letter here! ✎'
                    }
                    value={this.state.content}
                  ></textarea>
                </div>
              </div>
              <span className='right floated icon'>
                <Icon icon={icon} />
              </span>
            </div>
          </div>
          <>
            <Button
              onClick={
                isRead ? this.handleSubmitResponse : this.handleSubmitLetter
              }
              className='ui right floated button'
            >
              Send
            </Button>
            <Button
              onClick={() => setDesk()}
              className='ui right floated button'
            >
              Close
            </Button>
          </>
        </div>
      </>
    )
  }
}

export default Write
