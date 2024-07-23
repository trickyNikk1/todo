import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    onPlay: () => {},
    onStop: () => {},
    onDeleted: () => {},
    onEdit: () => {},
    onSubmit: () => {},
    onScratched: () => {},
    todos: [],
  }
  static propTypes = {
    onPlay: PropTypes.func,
    onStop: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onSubmit: PropTypes.func,
    onScratched: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.object),
  }
  render() {
    const { todos, onScratched, onDeleted, onEdit, onSubmit, onPlay, onStop } = this.props
    const elements = todos.map((itemProps) => {
      const { num, status } = itemProps
      return (
        <li className={status} key={num}>
          <Task
            onPlay={() => onPlay(num)}
            onStop={() => onStop(num)}
            onDeleted={() => onDeleted(num)}
            onScratched={() => onScratched(num)}
            onEdit={() => onEdit(num, false)}
            onSubmit={(description, num) => onSubmit(description, num)}
            {...itemProps}
          />
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
