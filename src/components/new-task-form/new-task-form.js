import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default function NewTaskForm({ onSubmit }) {
  const [state, setState] = useState({ todo: '', min: '', sec: '' })
  const handleSubmit = (event) => {
    event.preventDefault()
    let counter = Object.keys(state).length
    for (let key in state) {
      if (state[key] === '') {
        document.querySelector(`#${key}`).focus()
        return
      }
      counter -= 1
      if (counter === 0) {
        onSubmit(state)
        setState({ todo: '', min: '', sec: '' })
        document.querySelector('#todo').focus()
      }
    }
  }
  const handleChange = (event) => {
    const { value, name } = event.target
    if (validateTime(value) || name === 'todo') {
      setState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        }
      })
    }
  }
  const validateTime = (value) => {
    const regex = /^[0-5]{0,1}[0-9]{0,1}$/
    return regex.test(value)
  }
  const { todo, min, sec } = state
  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          autoFocus
          name="todo"
          id="todo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={handleChange}
        />
        <input
          name="min"
          id="min"
          value={min}
          onChange={handleChange}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          name="sec"
          id="sec"
          value={sec}
          onChange={handleChange}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
        <input className="hide" type="submit" />
      </form>
    </header>
  )
}
NewTaskForm.propTypes = {
  onSubmit: PropTypes.func,
}
