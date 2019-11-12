import React, { Component } from 'react'
import Button from '../components/Button'
import Read from '../components/Read'
import LetterCollection from '../containers/LetterCollection'

const LETTER_URL = 'http://localhost:3000/letters/'
class Journal extends Component {
  state = {
    letter: {},
    letters: [],
    lettersHistory: [],
    response: {},
    responses: [],
    responseHistory: []
  }

  fetchAccountsLetters = () => {
    const { accountId } = this.props

    fetch(`${LETTER_URL}?account_id=${accountId}`)
      .then(resp => resp.json())
      .then(letters => {
        let letter = letters.pop()
        fetch(this.fetchLetterResponses(letter.id))

        this.setState({
          letter: letter,
          letters: letters
        })
      })
  }

  fetchLetterResponses = letterId => {
    fetch(`${LETTER_URL}/${letterId}/responses`)
      .then(resp => resp.json())
      .then(responses => {
        let response = responses.pop()

        this.setState({
          response: response,
          responses: responses
        })
      })
  }

  renderJournalRead = () => {
    const { letter } = this.state

    if (letter) return <Read letter={letter} isWrite={false} />
  }

  renderResponseRead = () => {
    const { response } = this.state

    if (response) return <Read letter={response} isWrite={false} />
    else return <Read letter={null} isWrite={false} />
  }

  navigationHandler = (item, stack, stackHistory, isLetter, isForward) => {
    if (isForward) this.navigateForward(item, stack, stackHistory, isLetter)
    else this.navigateBackward(item, stack, stackHistory, isLetter)
  }

  navigateBackward = (item, stack, stackHistory, isLetter) => {
    if (stack.length > 0) {
      stackHistory.push(item)
      item = stack.pop()

      if (isLetter) this.fetchLetterResponses(item.id)

      this.updateState(item, stack, stackHistory, isLetter)
    }
  }

  navigateForward = (item, stack, stackHistory, isLetter) => {
    if (stackHistory.length > 0) {
      stack.push(item)
      item = stackHistory.pop()

      if (isLetter) this.fetchLetterResponses(item.id)

      this.updateState(item, stack, stackHistory, isLetter)
    }
  }

  updateState = (item, stack, stackHistory, isLetter) => {
    if (isLetter) this.updateLettersState(item, stack, stackHistory)
    else this.updateResponsesState(item, stack, stackHistory)
  }

  updateLettersState = (item, stack, stackHistory) => {
    this.setState({
      letter: item,
      letters: stack,
      lettersHistory: stackHistory
    })
  }

  updateResponsesState = (item, stack, stackHistory) => {
    this.setState({
      response: item,
      responses: stack,
      responsesHistory: stackHistory
    })
  }

  lettersBack = () => {
    let { letter, letters, lettersHistory } = this.state
    this.navigationHandler(letter, letters, lettersHistory, true, false)
  }

  lettersForward = () => {
    let { letter, letters, lettersHistory } = this.state
    this.navigationHandler(letter, letters, lettersHistory, true, true)
  }

  responsesBack = () => {
    let { response, responses, responseHistory } = this.state
    this.navigationHandler(response, responses, responseHistory, false, false)
  }

  responsesForward = () => {
    let { response, responses, responseHistory } = this.state
    this.navigationHandler(response, responses, responseHistory, false, true)
  }

  componentDidMount() {
    this.fetchAccountsLetters()
  }

  render() {
    const { letter, response } = this.state

    return (
      <div>
        <h2>Journal</h2>
        <LetterCollection
          letter={letter}
          back={this.lettersBack}
          forward={this.lettersForward}
        />

        <LetterCollection
          letter={response}
          back={this.responsesBack}
          forward={this.responsesForward}
        />
        <br />
        <div>
          <Button onClick={this.props.handleCloseClick} className='ui button'>
            Close
          </Button>
        </div>
      </div>
    )
  }
}

export default Journal
