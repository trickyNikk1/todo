import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    todo: '',
    min: '',
    sec: '',
  }
  static defaultProps = {
    onSubmit: () => {},
  }
  static propTypes = {
    onSubmit: PropTypes.func,
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let counter = Object.keys(this.state).length
    for (let key in this.state) {
      if (this.state[key] === '') {
        document.querySelector(`#${key}`).focus()
        return
      }
      counter -= 1
      if (counter === 0) {
        this.props.onSubmit(this.state)
        this.setState({ todo: '', min: '', sec: '' })
        document.querySelector('#todo').focus()
      }
    }
  }
  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   const { todo, min, sec } = this.state
  //   if (!todo && !min && !sec) {
  //     return
  //   }
  //   if (todo && min && sec) {
  //     this.props.onSubmit(this.state)
  //     this.setState({ todo: '', min: '', sec: '' })
  //     document.querySelector('#todo').focus()
  //   }
  //   if (todo && !min && !sec) {
  //     document.querySelector('#min').focus()
  //   }
  //   if (todo && min && !sec) {
  //     document.querySelector('#sec').focus()
  //   }
  //   if (!todo && min && !sec) {
  //     document.querySelector('#sec').focus()
  //   }
  //   if (!todo && min && sec) {
  //     document.querySelector('#todo').focus()
  //   }
  // }
  handleChange = (event) => {
    const { value, name } = event.target
    if (this.validateTime(value) || name === 'todo') {
      this.setState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        }
      })
    }
  }
  validateTime = (value) => {
    const regex = /^[0-5]{0,1}[0-9]{0,1}$/
    return regex.test(value)
  }
  render() {
    const { todo, min, sec } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit}>
          <input
            autoFocus
            name="todo"
            id="todo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todo}
            onChange={this.handleChange}
          />
          <input
            name="min"
            id="min"
            value={min}
            onChange={this.handleChange}
            className="new-todo-form__timer"
            placeholder="Min"
          />
          <input
            name="sec"
            id="sec"
            value={sec}
            onChange={this.handleChange}
            className="new-todo-form__timer"
            placeholder="Sec"
          />
          <input className="hide" type="submit" />
        </form>
      </header>
    )
  }
}
